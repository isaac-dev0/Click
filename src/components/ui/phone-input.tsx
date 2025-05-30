"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Countries } from "@/utils/countries";
import { formatPhoneNumber } from "@/utils/validators";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  placeholder?: string;
  country?: Countries;
  disabled?: boolean;
  required?: boolean;
}

export function PhoneInput({
  name,
  label = "Phone Number",
  placeholder = "+1 (555) 123-4567",
  country,
  disabled = false,
  required = false,
  className,
  ...props
}: PhoneInputProps) {
  const form = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const formattedValue = formatPhoneNumber(e.target.value, country);
    onChange(formattedValue);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)} {...props}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              onChange={(e) => handleInputChange(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 