// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "../hooks/useAuth";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import toast from "react-hot-toast";

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(4, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, status } = useRegister();
  const isLoading = status === "pending";

  const onSubmit = (data: RegisterFormInputs) => {
    const { confirmPassword, ...userData } = data; // Exclude confirmPassword
    registerUser(userData, {
      onSuccess: (response) => {
        toast.success("Registration successful!");
        console.log(response);
        // Redirect to login
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-[#eff2ff] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
          />
          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword}
          />
          <FormButton label={isLoading ? "Registering..." : "Register"} />
        </form>
        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
