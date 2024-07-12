'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { VerifySchema } from "@/schema/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import {useForm } from "react-hook-form";
import * as z from "zod";

const VerifyOtp = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
  });

  const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
    try {
      const response = await axios.post("/api/verify-otp", {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/signin");
    } catch (error) {
      console.error("Verification error", error);
      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with OTP verification. Please try again.");

      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verifiaction Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
