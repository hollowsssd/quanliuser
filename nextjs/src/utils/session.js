import { cookies } from "next/headers";

export const setSession = async (token, user) => {
  if (!process.env.SESSION_SECRET) {
    return;
  }
  await fetch(`${process.env.APP_URL}/api/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      secret: process.env.SESSION_SECRET,
    },
    body: JSON.stringify({ token, user }),
  });
};

export const getSession = async () => {
  if (!process.env.SESSION_SECRET) {
    return;
  }
  const token = cookies().get("token")?.value;
  const response = await fetch(`${process.env.APP_URL}/api/session`, {
    headers: {
      token: token,
      secret: process.env.SESSION_SECRET,
    },
  });
  if (!response.ok) {
    return false;
  }
  const { user } = await response.json();
  if (!user) {
    return false;
  }
  return user;
};