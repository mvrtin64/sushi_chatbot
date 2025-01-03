import axios from 'axios';

const API_URL = 'http://localhost:5000/api/menu'; 

export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};
