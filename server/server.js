const express = require("express");
const app = express();
const port = 9898;
const cors = require("cors");
const corsOptions = {
  origin: `http://localhost:5173`,
};
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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
    // Generate JWT
    const token = generateJWT({ name, email, message });

    const webhookUrl =
      "https://hanzn8n.safehub-lcup.uk/webhook/portfolioToEmail"; // Replace with your webhook URL
    const response = await axios.post(
      webhookUrl,
      {}, // No body needed if the token is in the header
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
        },
      }
    );

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

app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    // Generate JWT
    const token = generateJWT({ message });

    const webhookUrl = "https://hanzn8n.safehub-lcup.uk/webhook-test/toChatbot"; // Replace with your webhook URL
    const response = await axios.post(
      webhookUrl,
      {}, // No body needed if the token is in the header
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
        },
      }
    );

    res.status(200).json({ success: true, output: response.data.output });
  } catch (error) {
    console.error("Error communicating with the webhook:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    res.status(500).json({ error: "Failed to communicate with the webhook." });
  }
});

// Middleware to verify JWT
function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    req.user = decoded;
    next();
  });
}

// Generate JWT
function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256", // Specify the algorithm explicitly
    expiresIn: "1h",
  });
}

module.exports = { verifyJWT, generateJWT };

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
