import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useToast } from "../hooks/use-toast";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual login API call
      console.log("Login data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Login Successful!",
        description: "Welcome back to WhatsApp!",
      });

      // Navigate to main app after successful login
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <StatusBar />

      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link
            to="/"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h1 className="text-[20px] font-semibold text-black">Sign In</h1>
          <div className="w-8 h-8"></div>
        </div>

        {/* Welcome Section */}
        <div className="px-6 py-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#1DAB61] rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60565 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47086C20.0052 6.94694 20.885 8.91568 21 11V11.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
              />
            </svg>
          </div>
          <h2 className="text-[24px] font-bold text-black mb-2">
            Welcome Back
          </h2>
          <p className="text-[16px] text-[#666666] leading-relaxed">
            Sign in to continue your conversations with friends and family.
          </p>
        </div>

        {/* Login Form */}
        <div className="px-6 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] font-medium text-black">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="h-[52px] text-[16px] border-[#E5E5E5] rounded-lg focus:border-[#1DAB61] focus:ring-[#1DAB61]"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-[14px]" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] font-medium text-black">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="h-[52px] text-[16px] border-[#E5E5E5] rounded-lg focus:border-[#1DAB61] focus:ring-[#1DAB61]"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-[14px]" />
                  </FormItem>
                )}
              />

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-[14px] text-[#1DAB61] font-medium underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-[#1DAB61] hover:bg-[#1DAB61]/90 text-white text-[16px] font-medium rounded-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          {/* Create Account */}
          <div className="text-center mt-6">
            <span className="text-[14px] text-[#666666]">
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-[14px] text-[#1DAB61] font-medium underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
