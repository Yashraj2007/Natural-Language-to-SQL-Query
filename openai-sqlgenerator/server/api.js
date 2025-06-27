import dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

// Get API key from environment
const openaiApiKey = process.env.OPENAI_API_KEY;

// Validate key
if (!openaiApiKey) {
  console.error('❌ OPENAI_API_KEY is not set in .env');
  process.exit(1); // Stop the server if key is missing
}

// Initialize OpenAI API client
const openai = new OpenAIApi(
  new Configuration({ apiKey: openaiApiKey })
);

export default openai;
