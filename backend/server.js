const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require('./routes/usersRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const faqsRoutes = require('./routes/faqsRoutes');
const businessHoursRoutes = require('./routes/businessHoursRoutes');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DATABASE,  
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) console.log("Error getting collections:", err);
      else {
        console.log("Available collections:", collections.map(c => c.name));
        if (!collections.find(c => c.name === 'menu')) {
          console.warn("Warning: 'menu' collection not found in database");
        }
      }
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Sushi Chatbot API test");
});

app.use("/api/menu", menuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/business-hours', businessHoursRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
