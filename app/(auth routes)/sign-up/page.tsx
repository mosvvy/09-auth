"use client";

import { redirect } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/app/api/clientApi";

export default function SignUpPage() {
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("Registration successful");
      console.log("Redirecting to profile page...");
      redirect("/profile");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // Handle sign-in logic here

    mutate({ email, password });

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
}
