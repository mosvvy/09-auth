// // "use client";

// // import { useMutation } from "@tanstack/react-query";
// // import css from "./SignInPage.module.css";
// // import { login } from "@/lib/clientApi";

// // export default function SignInPage() {
// //   const { mutate, isPending } = useMutation({
// //     mutationFn: login,
// //     onSuccess: (data) => {
// //       console.log("Login successful:", data);
// //     },
// //     onError: (error) => {
// //       console.error("Login failed:", error);
// //     },
// //   });

// //   const handleSubmit = (formData: FormData) => {
// //     const email = formData.get("email") as string;
// //     const password = formData.get("password") as string;
// //     // Handle sign-in logic here
// //     mutate({ email, password });
// //   };

// //   const error = "";

// //   return (
// //     <main className={css.mainContent}>
// //       <form className={css.form} action={handleSubmit}>
// //         <h1 className={css.formTitle}>Sign in</h1>

// //         <div className={css.formGroup}>
// //           <label htmlFor="email">Email</label>
// //           <input
// //             id="email"
// //             type="email"
// //             name="email"
// //             className={css.input}
// //             required
// //           />
// //         </div>

// //         <div className={css.formGroup}>
// //           <label htmlFor="password">Password</label>
// //           <input
// //             id="password"
// //             type="password"
// //             name="password"
// //             className={css.input}
// //             required
// //           />
// //         </div>

// //         <div className={css.actions}>
// //           <button
// //             type="submit"
// //             className={css.submitButton}
// //             disabled={isPending}
// //           >
// //             Log in
// //           </button>
// //         </div>

// //         <p className={css.error}>{error}</p>
// //       </form>
// //     </main>
// //   );
// // }

// "use client";

// import { login, type LoginPayload } from "@/lib/clientApi";
// import css from "./SignInPage.module.css";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { ApiError } from "@/types/api";
// import { useAuthStore } from "@/lib/store/auth";

// export default function SignIn() {
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const setUser = useAuthStore((state) => state.setUser);
//   const handleSubmit = async (formData: FormData) => {
//     try {
//       const formValues = Object.fromEntries(formData) as LoginPayload;

//       const user = await login(formValues);

//       if (user) {
//         setUser(user);
//         router.push("/profile");
//       }
//     } catch (error) {
//       setError(
//         (error as ApiError).response?.data?.error ??
//           (error as ApiError).message ??
//           "Invalid email or password"
//       );
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <form className={css.form} action={handleSubmit}>
//         <h1 className={css.formTitle}>Sign in</h1>

//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             className={css.input}
//             id="email"
//             type="email"
//             name="email"
//             required
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             className={css.input}
//             id="password"
//             type="password"
//             name="password"
//             required
//           />
//         </div>

//         <button type="submit" className={css.submitButton}>
//           Log in
//         </button>

//         {error && <p className={css.error}>{error}</p>}
//       </form>
//     </main>
//   );
// }

"use client";

import { login, LoginPayload } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/types/api";
import { useAuthStore } from "@/lib/store/auth";

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginPayload;

      const user = await login(formValues);

      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Invalid email or password"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            className={css.input}
            id="email"
            type="email"
            name="email"
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            className={css.input}
            id="password"
            type="password"
            name="password"
            required
          />
        </div>

        <button type="submit" className={css.submitButton}>
          Log in
        </button>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
