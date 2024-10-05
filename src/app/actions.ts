"use server";

import { ONE_MONTH_IN_SECONDS } from "@/constants/time";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function navigate(url: string) {
  redirect(`${url}`);
}

export async function setAuthCookie(cookieValue: string) {
  cookies().set("auth", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: ONE_MONTH_IN_SECONDS,
    path: "/",
  });
}

export async function removeAuthCookie() {
  cookies().delete("auth");
}
