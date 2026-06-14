export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;

  createdAt: string; // o Date
  updatedAt: string; // o Date

  role?: string | null;

  phoneNumber?: string | null;
  phoneNumberVerified?: boolean | null;

  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: string | Date | null;
}