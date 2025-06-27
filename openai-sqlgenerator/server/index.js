import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Validate API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY is missing in .env file');
  process.exit(1);
}

// Configure OpenAI for OpenRouter
const configuration = new Configuration({
  apiKey,
  basePath: "https://openrouter.ai/api/v1", // IMPORTANT for OpenRouter
});
const openai = new OpenAIApi(configuration);

// Health check
app.get("/", (req, res) => {
  res.send("SQL Generator API is running.");
});

// Route to generate SQL
app.post('/generate-sql', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing prompt' });
  }

  try {
  const response = await openai.createChatCompletion({
  model: 'mistralai/mistral-small-24b-instruct-2501:free',
  messages: [
        {
          role: "system",
          content: "You are a professional SQL assistant. Respond with ONLY the SQL query first, followed by a plain English explanation. Avoid markdown or ```."
        },
        {
          role: "user",
          content: `Convert this to SQL: ${prompt}`
        }
      ],
      temperature: 0.2,
    });



    const sql = response?.data?.choices?.[0]?.message?.content?.trim();

    if (!sql) {
      return res.status(500).json({ error: 'No SQL generated. Try again.' });
    }

    res.json({ sql });
  } catch (error) {
    console.error('OpenAI API error:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'An error occurred while generating SQL' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
