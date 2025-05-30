import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Countries, getCountriesArray } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const OrganisationDetailsSchema = z.object({
  name: z.string().max(48, {
    message: "Name cannot exceed 48 characters.",
  }),
  description: z.string().max(1024, {
    message: "Description cannot exceed 1024 characters.",
  }),
  website: z.string().url({
    message: "Website must contain a valid URL.",
  }),
  country: z.nativeEnum(Countries),
});

export type OrganisationDetailsData = z.infer<typeof OrganisationDetailsSchema>;

interface OrganisationDetailsFormProps {
  onSubmit?: (data: OrganisationDetailsData) => void;
  defaultValues?: Partial<OrganisationDetailsData>;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

export function OrganisationDetailsForm({ onSubmit, defaultValues, formRef }: OrganisationDetailsFormProps) {
  const countries = getCountriesArray();

  const form = useForm<OrganisationDetailsData>({
    resolver: zodResolver(OrganisationDetailsSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      website: "",
      country: Countries.UNITED_KINGDOM,
    },
  });

  const handleFormSubmit = (data: OrganisationDetailsData) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your organisation"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/" {...field} />
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
              <FormLabel>Country of Incorporation</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
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
        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  );
}
