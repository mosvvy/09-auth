// "use client";

// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import { register } from "@/lib/clientApi";
// import { useAuthStore } from "@/lib/store/auth";
// import { useState } from "react";
// import { AxiosError } from "axios";
// import { ApiError } from "@/types/api";
// import css from "./SignUpPage.module.css";

// export default function SignUpPage() {
//   const setUser = useAuthStore((store) => store.setUser);
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);

//   // const { mutate, isPending } = useMutation({
//   //   mutationFn: register,
//   //   onSuccess: (data) => {
//   //     console.log("Registration successful");
//   //     console.log("Redirecting to profile page...");
//   //     setUser(data);
//   //     router.push("/profile");
//   //   },
//   //   onError: (error) => {
//   //     console.error("Registration failed:", error);
//   //   },
//   // });

//   const handleSubmit = async (formData: FormData) => {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     // Handle sign-in logic here

//     // mutate({ email, password });

//     try {
//       // const formValues = Object.fromEntries(formData) as RegisterRequest;
//       // const res = await register(formValues);
//       const res = await register({ email, password });
//       if (res) {
//         router.push("/profile");
//         setUser(res);
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       setError(
//         (error as ApiError).response?.data?.error ??
//           (error as ApiError).message ??
//           "Oops... some error"
//       );
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <h1 className={css.formTitle}>Sign up</h1>
//       <form className={css.form} action={handleSubmit}>
//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             className={css.input}
//             required
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             className={css.input}
//             required
//           />
//         </div>

//         <div className={css.actions}>
//           <button
//             type="submit"
//             className={css.submitButton}
//             // disabled={isPending}
//           >
//             Register
//           </button>
//         </div>

//         {error && <p className={css.error}>{error}</p>}
//       </form>
//     </main>
//   );
// }

"use client";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterPayload } from "@/lib/api/clientApi";
import { AxiosError } from "axios";

import { useAuthStore } from "@/lib/store/auth";
import { ApiError } from "@/types/api";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterPayload;
      const res = await register(formValues);
      if (res) {
        router.push("/profile");
        setUser(res);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <label className={css.formGroup}>
          Email
          <input className={css.input} type="email" name="email" required />
        </label>

        <label className={css.formGroup}>
          Password
          <input
            className={css.input}
            type="password"
            name="password"
            required
          />
        </label>
        <button className={css.submitButton} type="submit">
          Register
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default SignUp;
