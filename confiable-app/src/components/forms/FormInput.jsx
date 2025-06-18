"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FormInput({ name, label, placeholder }) {
  const { control } = useFormContext();
  const isPassword = name.toLowerCase().includes("password");
  const isOriginalPassword = name.toLowerCase() === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <Input
                  {...field}
                  type={
                    isPassword ? (showPassword ? "text" : "password") : "text"
                  }
                  placeholder={placeholder}
                />
                {isPassword && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              {isOriginalPassword && <small className="self-end">Min. of 6 characters</small>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
