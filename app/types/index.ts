import { Listing, Reservation, User } from "@prisma/client";

export type safeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
  > & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: safeListing;
};

export type SafeUser = Omit<
User,
"createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};