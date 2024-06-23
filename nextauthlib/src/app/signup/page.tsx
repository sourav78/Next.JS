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
import { Github, Chrome } from "lucide-react";

const Signup = () => {
  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>Register to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="xyz" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="xyz@email.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="xyz@email.com" />
                </div>
                <Button type="submit">Signup</Button>
              </div>
            </form>
          </CardContent>

          <p className="text-center mb-2">or</p>
          <CardFooter className="flex-col">
            <CardContent className="w-full flex justify-evenly">
              <Button variant="outline">
                <Github className="h-4 w-4 mr-1" />
                Github
              </Button>
              <Button variant="outline">
                <Chrome className="h-4 w-4 mr-1" />
                Google
              </Button>
            </CardContent>
            <Link className="text-sm" href={"/login"}>
              Already have an account? signin
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Signup;
