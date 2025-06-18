"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import FormContainer from "./FormContainer";
import { accentClassNames } from "@/lib/utils";
import { sleep } from "@/lib/utils";

// Validation schema
const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ForgotPassword() {
  const { accent, accentHover } = accentClassNames

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    await sleep(2000)
    console.log("Form Data:", data);
    methods.reset();
  };

  return (
    <FormContainer title={"Change your password"} subtitle={"Kindly update your password"}>
      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
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

            <Button type="submit" className={`w-full ${accent} ${accentHover}`}>
              {methods.formState.isSubmitting ? 'Submitting...' : 'Update Password'}
            </Button>
          </form>
        </Form>
      </FormProvider>
    </FormContainer>
  );
}
