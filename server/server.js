const express = require("express");
const app = express();
const port = 9898;
const cors = require("cors");
const corsOptions = {
  origin: `http://localhost:5173`,
};
const axios = require("axios");

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Welcome to the root path!");
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const webhookUrl =
      "https://hanzn8n.safehub-lcup.uk/webhook/portfolioToEmail"; // Replace with your webhook URL
    const response = await axios.post(webhookUrl, { name, email, message });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error forwarding to webhook:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    res.status(500).json({ error: "Failed to forward message to webhook." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
