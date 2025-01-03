export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

const API_URL = 'http://localhost:5000/api';

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_URL}/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
}; 