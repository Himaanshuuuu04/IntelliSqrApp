import React, { useEffect } from "react";
import { useUserDetails, useDeleteUser } from "../hooks/useUser";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { data, isLoading, error } = useUserDetails();
  const { mutate: deleteUser, status } = useDeleteUser();
  const isDeleting = status === "pending";

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete user");
      },
    });
  };
  useEffect(() => {
    if (isLoading) {
      console.log("Loading user details...");
    }
    if (error) {
      console.error("Error fetching user details");
    }
  }, [isLoading, error]);
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ul className="mb-4">
        {data?.users.map((user) => (
          <li key={user.id} className="mb-2">
            <span className="font-medium">{user.email}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        {isDeleting ? "Deleting..." : "Delete My Account"}
      </button>
    </div>
  );
};

export default UserManagement;