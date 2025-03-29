// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../hooks/useAuth";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, status } = useLogin();
  const isLoading = status === "pending";

  const onSubmit = (data: LoginFormInputs) => {
    login(data, {
      onSuccess: (response) => {
        toast.success("Login successful!");
        navigate("/user-management"); // Redirect to user management page
        console.log(response);
        // Redirect or store token
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-[#eff2ff] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h1>
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
          <FormButton label={isLoading ? "Logging in..." : "Login"} />
        </form>
        <div className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;


