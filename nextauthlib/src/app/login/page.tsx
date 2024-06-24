import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {Github, Chrome} from "lucide-react"
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const Login = () => {

  const onLogin = async(formData:FormData) => {
    "use server"

    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if(!email || !password){
      throw new Error("Please provide all fields.")
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/"
      })
    } catch (error) {
      const err = error as CredentialsSignin
      return err.message
    }
  }

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to access the page</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={onLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="xyz@email.com" name="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="xyz@email.com" name="password"/>
                </div>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>

          <p className="text-center mb-2">or</p>
          <CardFooter className="flex-col">
            <CardContent className="w-full flex justify-evenly">
              
              <Button variant="outline">
                <Github className="h-4 w-4 mr-1"/>
                Github</Button>
              <Button variant="outline">
                <Chrome className="h-4 w-4 mr-1"/>
                Google</Button>
            </CardContent>
            <Link className="text-sm" href={"/signup"}>Dont have an account? signup</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
