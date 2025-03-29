import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export interface User {
  id: string;
  email: string;
}

export interface UserDetailsResponse {
  users: User[];
}

export const fetchUserDetails = async (): Promise<UserDetailsResponse> => {
  const response = await axios.get(`${API_URL}/details`, { withCredentials: true });
  return response.data;
};

export const deleteUserDetails = async (): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/remove-details`, { withCredentials: true });
  return response.data;
};