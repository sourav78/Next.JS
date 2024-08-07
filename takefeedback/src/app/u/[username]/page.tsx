"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { MessagesSchema } from "@/schema/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AnanymousPage = () => {
  const query = useParams<{ username: string }>();

  const username = query.username;

  const form = useForm<z.infer<typeof MessagesSchema>>({
    resolver: zodResolver(MessagesSchema),
  });

  const messageContent = form.watch("content");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof MessagesSchema>) => {
    setIsLoading(true);

    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
      });

      form.reset({...form.getValues(), content: ""})
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your ananymous message"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="m-auto"
              disabled={isLoading || !messageContent}
            >
              {
                isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Sending...
                  </>
                ) : (
                  <>{"Send"}</>
                )
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnanymousPage;
