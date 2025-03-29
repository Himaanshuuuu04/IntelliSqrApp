import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, fetchUserProfile } from "../services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
};
