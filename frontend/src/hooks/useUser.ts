import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails, deleteUserDetails, UserDetailsResponse } from "../services/userService";

export const useUserDetails = () => {
  return useQuery<UserDetailsResponse>({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserDetails,
    onSuccess: () => {
      // Invalidate the user details query to refetch data
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
  });
};