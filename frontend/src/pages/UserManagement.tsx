import React from "react";
import { useUserDetails, useDeleteUser } from "../hooks/useUser";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { user, logout } = useAuth();
  const { data, isLoading, error } = useUserDetails();
  const { mutate: deleteUser, status } = useDeleteUser();
  const isDeleting = status === "pending";

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
        logout(); // Log out the user after deleting their account
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete user");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">Error fetching user details</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen  flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Management</h1>
        <p className="text-center text-gray-600 mb-4">
          Logged in as: <span className="font-medium text-gray-800">{user?.email}</span>
        </p>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-200"
          >
            {isDeleting ? "Deleting..." : "Delete My Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;