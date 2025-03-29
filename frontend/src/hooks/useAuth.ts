import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, registerUser, fetchUserProfile } from "../services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
  });
};
export const useCheck = () => {
  return useMutation({
    mutationFn: () => fetchUserProfile(),
  });
};

export const useUserProfile = () => {
  // Debugging line
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,

    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false, // Do not retry if the user is not authenticated
  });
};
