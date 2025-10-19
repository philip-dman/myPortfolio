"use server";
import jwt from "jsonwebtoken";

export type ChatBotResponse = {
  output: string;
};

export async function sendMessageToChatbot(message: string) {
  const token = jwt.sign(
    {
      message,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  const data: ChatBotResponse = await response.json();

  return data;
}
