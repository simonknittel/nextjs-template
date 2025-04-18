export const MESSAGES = {
  setPassword: {
    invalidToken: {
      query: "invalid-token",
      message: "The link is invalid or has expired.",
    },
    passwordRequirements: {
      query: "password-requirements",
      message: "The password does not meet the requirements.",
    },
    passwordsDontMatch: {
      query: "passwords-dont-match",
      message: "The passwords do not match.",
    },
    passwordBreached: {
      query: "password-breached",
      message:
        "The password was found in a database of stolen passwords. Please choose a different one.",
    },
    rateLimit: {
      query: "rate-limit",
      message: "Too many attempts. Please try again later.",
    },
    unknown: {
      query: "unknown",
      message: "An unknown error occurred.",
    },
  },
  login: {
    userOrPasswordInvalid: {
      query: "user-or-password-invalid",
      message: "The email address or password is incorrect.",
    },
    passwordMissing: {
      query: "password-missing",
      message:
        "You need to set a new password before logging in. You'll receive an email with a link to set your password.",
    },
    verified: {
      query: "verified",
      message: "Your email address has been verified. You can now log in.",
    },
    rateLimit: {
      query: "rate-limit",
      message: "Too many attempts. Please try again later.",
    },
    unknown: {
      query: "unknown",
      message: "An unknown error occurred.",
    },
  },
  signup: {
    passwordRequirements: {
      query: "password-requirements",
      message: "The password does not meet the requirements.",
    },
    passwordsDontMatch: {
      query: "passwords-dont-match",
      message: "The passwords do not match.",
    },
    passwordBreached: {
      query: "password-breached",
      message:
        "The password was found in a database of stolen passwords. Please choose a different one.",
    },
    rateLimit: {
      query: "rate-limit",
      message: "Too many attempts. Please try again later.",
    },
    unknown: {
      query: "unknown",
      message: "An unknown error occurred.",
    },
  },
  verifyEmail: {
    invalidToken: {
      query: "invalid-token",
      message: "The link is invalid or has expired.",
    },
    unverified: {
      query: "unverified",
      message: "Please check your emails to confirm your account.",
    },
    signup: {
      query: "signup",
      message:
        "You have successfully signed up. Please check your emails to confirm your account before logging in.",
    },
    rateLimit: {
      query: "rate-limit",
      message: "Too many attempts. Please try again later.",
    },
    unknown: {
      query: "unknown",
      message: "An unknown error occurred.",
    },
  },
} as const;

export const getMessage = (
  category: "setPassword" | "login" | "signup" | "verifyEmail",
  query: string | null,
): string => {
  const categoryMessages = MESSAGES[category];

  if (!query) return "An unknown error occurred.";

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    Array.from(Object.entries(categoryMessages)).find(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ([, value]) => value.query === query,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    )?.[1].message ?? "An unknown error occurred."
  );
};
