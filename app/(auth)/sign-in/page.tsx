"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<SignInFormData> = async (
    data: SignInFormData
  ) => {
    try {
      // TODO: Implement actual authentication logic
      // await signIn(data);
    } catch (error) {
      // TODO: Handle authentication errors and show user feedback
      console.error("Sign in failed:", error);
    }
  };
  return (
    <div className="h-full">
      <h1 className="form-title mt-8">Welcome back</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Enter your email"
          type="email"
          placeholder="contact@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\w@\w\.\w$/,
              message: "Invalid email format",
            },
          }}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign In"}
        </Button>
        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      </form>
    </div>
  );
};
export default SignIn;
