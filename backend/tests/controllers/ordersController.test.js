const mongoose = require('mongoose');
const { getAllOrders, addOrder, updateOrderStatus } = require('../../controllers/ordersController');
const Order = require('../../models/orders');
const User = require('../../models/users');
const Menu = require('../../models/menu');

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnValue({ json: jest.fn() }),
    json: jest.fn()
  };
  return res;
};

describe('Orders Controller', () => {
  beforeEach(async () => {
    await Order.deleteMany({});
    await User.deleteMany({});
    await Menu.deleteMany({});
  });

  describe('getAllOrders', () => {
    it('should get all orders with populated user and menu items', async () => {
      const user = await User.create({ name: 'Test User' });
      
      const menuItem = await Menu.create({
        name: 'California Roll',
        description: 'Fresh roll',
        price: 10,
        category: 'maki'
      });

      const order = await Order.create({
        user: user._id,
        items: [{
          menuItem: menuItem._id,
          quantity: 2,
          price: 20
        }],
        totalPrice: 20
      });

      const req = {};
      const res = mockResponse();

      await getAllOrders(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status().json).toHaveBeenCalled();
    });

    it('should handle errors and return 500 status', async () => {
      const req = {};
      const res = mockResponse();
      
      // force an error by breaking the database connection
      jest.spyOn(Order, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getAllOrders(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('addOrder', () => {
    it('should create a new order successfully', async () => {
      const user = await User.create({ name: 'Test User' });
      const menuItem = await Menu.create({
        name: 'California Roll',
        description: 'Fresh roll',
        price: 10,
        category: 'maki'
      });

      const req = {
        body: {
          user: 'Test User',
          items: [{
            menuItem: 'California Roll',
            quantity: 2,
            price: 20
          }],
          totalPrice: 20
        }
      };
      const res = mockResponse();

      await addOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle invalid order items', async () => {
      const req = {
        body: {
          user: 'Test User',
          items: 'invalid', 
          totalPrice: 20
        }
      };
      const res = mockResponse();

      await addOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status successfully', async () => {
      const order = await Order.create({
        user: new mongoose.Types.ObjectId(),
        items: [{
          menuItem: new mongoose.Types.ObjectId(),
          quantity: 1,
          price: 10
        }],
        totalPrice: 10
      });

      const req = {
        params: { id: order._id },
        body: { status: 'completed' }
      };
      const res = mockResponse();

      await updateOrderStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle invalid order ID', async () => {
      const req = {
        params: { id: 'invalid-id' },
        body: { status: 'completed' }
      };
      const res = mockResponse();

      await updateOrderStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
}); 