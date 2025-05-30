import { z } from "zod";
import {
  isValidPhoneNumber,
  formatIncompletePhoneNumber,
  CountryCode,
} from "libphonenumber-js";
import { Countries } from "./countries";

/* Zod schema for phone number validation. */
export const phoneNumberSchema = z.string().refine(
  (value) => {
    try {
      return isValidPhoneNumber(value, "GB");
    } catch {
      return false;
    }
  },
  {
    message:
      "Invalid phone number. Please enter a valid number with country code (e.g., +1234567890).",
  }
);

/* Format a phone number based on country. */
export const formatPhoneNumber = (phoneNumber: string, country?: Countries) => {
  try {
    if (country) {
      return formatIncompletePhoneNumber(
        phoneNumber,
        country as unknown as CountryCode
      );
    }
    return formatIncompletePhoneNumber(phoneNumber);
  } catch {
    return phoneNumber;
  }
};
