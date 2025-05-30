import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Countries, getCountriesArray } from "@/utils/countries";
import { phoneNumberSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const AccountDetailsSchema = z.object({
  firstName: z.string().max(24, {
    message: "First Name cannot exceed 24 characters.",
  }),
  surname: z.string().max(24, {
    message: "Surname cannot exceed 24 characters.",
  }),
  country: z.nativeEnum(Countries),
  phone: phoneNumberSchema,
});

export type AccountDetailsData = z.infer<typeof AccountDetailsSchema>;

interface AccountDetailsFormProps {
  onSubmit?: (data: AccountDetailsData) => void;
  defaultValues?: Partial<AccountDetailsData>;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

export function AccountDetailsForm({ onSubmit, defaultValues, formRef }: AccountDetailsFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<
    Countries | undefined
  >(defaultValues?.country);
  const countries = getCountriesArray();

  const form = useForm<AccountDetailsData>({
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues: defaultValues || {
      firstName: "",
      surname: "",
      country: Countries.UNITED_KINGDOM,
      phone: "",
    },
  });

  const handleFormSubmit = (data: AccountDetailsData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedCountry(value as Countries);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhoneInput
          name="phone"
          required
          country={selectedCountry}
        />
        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  );
}
