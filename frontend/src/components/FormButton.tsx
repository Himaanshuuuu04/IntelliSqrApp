import React from "react";

interface FormButtonProps {
  label: string;
}

const FormButton: React.FC<FormButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
    >
      {label}
    </button>
  );
};

export default FormButton;