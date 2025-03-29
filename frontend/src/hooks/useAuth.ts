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

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false, // Do not retry if the user is not authenticated
  });
};
