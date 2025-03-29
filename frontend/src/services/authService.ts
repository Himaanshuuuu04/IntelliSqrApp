import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
  return response.data;
};
