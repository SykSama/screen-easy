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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { SignUpFormScheme } from "./sign-up-form.schema";
import { signUpAction } from "./sign-up.action";

export default function SignUpForm() {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    signUpAction,
    zodResolver(SignUpFormScheme),
    {
      formProps: {
        mode: "onChange",
        values: {
          email: "",
          password: "",
        },
      },
    },
  );

  return (
    <div className="flex w-[330px] flex-1 flex-col justify-center sm:w-[384px]">
      <div className="mb-10">
        <h1 className="mb-2 mt-8 text-2xl lg:text-3xl">Get Started</h1>
        <h2 className="text-foreground-light text-sm">Create a new account</h2>
      </div>
      <div className="flex flex-col gap-5">
        <Button
          variant="outline"
          className="w-full border-gray-700 bg-transparent text-white hover:bg-gray-800"
        >
          <Icons.google className="mr-2 size-4" />
          Continue with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-strong w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-studio px-2 text-sm text-foreground">or</span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmitWithAction}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="johndoe@mail.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="password">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="******"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
            <Button type="submit" className="w-full">
              {action.isPending ? "Sign Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="my-8 self-center text-sm">
        Have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign In Now
        </Link>
      </div>
    </div>
  );
}
