"use server";
import jwt from "jsonwebtoken";
import { ChatBotResponse } from "../chatBot/chatbotActions";

export async function sendMessageToContact(
  message: string,
  name: string,
  email: string
) {
  const token = jwt.sign(
    {
      message,
      name,
      email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const response = await fetch(process.env.N8N_WEBHOOK_CONTACT_URL!, {
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
