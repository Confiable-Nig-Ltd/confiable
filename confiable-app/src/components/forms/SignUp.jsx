// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import FormInput from "./FormInput";
// import FormContainer from "./FormContainer";
// import { accentClassNames } from "@/lib/utils";
// import GoogleOption from "./GoogleOption";
// import { sleep } from "@/lib/utils";

// // Validation schema
// const formSchema = z
//   .object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().min(1, "Phone number is required"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string().min(6, "Confirm password is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export default function SignUpForm() {
//   const { accent, accentHover } = accentClassNames

//   const methods = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     await sleep(2000)
//     console.log("Form Data:", data);
//     methods.reset();
//   };

//   return (
//     <FormContainer title={"Welcome"} subtitle={"Let's set up your profile"}>
//       <FormProvider {...methods}>
//         <Form {...methods}>
//           <form
//             onSubmit={methods.handleSubmit(onSubmit)}
//             className="space-y-6 max-w-md mx-auto"
//           >
//             <FormInput
//               name="firstName"
//               label="First Name"
//               placeholder={"Enter your first name"}
//             />
//             <FormInput
//               name="lastName"
//               label="Last Name"
//               placeholder={"Enter your last name"}
//             />
//             <FormInput
//               name="email"
//               label="Email"
//               placeholder={"Enter your email"}
//             />
//             <FormInput
//               name="phone"
//               label="Phone"
//               placeholder={"Enter your phone number"}
//             />
//             <FormInput
//               name="password"
//               label="Password"
//               placeholder={"******"}
//             />
//             <FormInput
//               name="confirmPassword"
//               label="Confirm Password"
//               placeholder={"******"}
//             />

//             <Button type="submit" className={`w-full ${accent} ${accentHover}`}>
//               {methods.formState.isSubmitting ? 'Submitting...' : 'Sign Up'}
//             </Button>
//           </form>
//         </Form>
//       </FormProvider>
//       <GoogleOption buttonText={'Sign Up With Google'} bottomText={"Do you have an account?"} ctaText={'Sign In'} ctaPath={'/login'}  />
//     </FormContainer>
//   );
// }














"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import FormContainer from "./FormContainer";
import { accentClassNames } from "@/lib/utils";
import GoogleOption from "./GoogleOption";
import { sleep } from "@/lib/utils";
import { registerUser } from "../../services/firebase/authService";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    role: z.enum(["owner", "admin"]), 
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const { accent, accentHover } = accentClassNames;

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "owner",  
    },
  });

  const onSubmit = async (data) => {
    await sleep(1000); 
    const { email, password, role } = data;

    try {
      const result = await registerUser(email, password, role);
      if (result.success) {
        alert(`User registered as ${role}!`);
        methods.reset();
      } else {
        alert("Signup failed: " + result.error);
      }
    } catch (error) {
      alert("Unexpected error: " + error.message);
    }
  };

  return (
    <FormContainer title={"Welcome"} subtitle={"Let's set up your profile"}>
      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormInput
              name="firstName"
              label="First Name"
              placeholder={"Enter your first name"}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder={"Enter your last name"}
            />
            <FormInput
              name="email"
              label="Email"
              placeholder={"Enter your email"}
            />
            <FormInput
              name="phone"
              label="Phone"
              placeholder={"Enter your phone number"}
            />
            <FormInput
              name="password"
              label="Password"
              placeholder={"******"}
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder={"******"}
            />

            <div className="flex flex-col">
              <label htmlFor="role" className="mb-1 font-medium">
                Select Role
              </label>
              <select
                id="role"
                {...methods.register("role")}
                className="p-2 border rounded"
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button
              type="submit"
              className={`w-full ${accent} ${accentHover}`}
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </FormProvider>
      <GoogleOption
        buttonText={"Sign Up With Google"}
        bottomText={"Do you have an account?"}
        ctaText={"Sign In"}
        ctaPath={"/login"}
      />
    </FormContainer>
  );
}
