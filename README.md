# 🧠 Natural Language to SQL Query Converter

This is a full-stack web app that converts plain English into SQL queries using AI models like OpenAI or OpenRouter. It includes a **React frontend** and a **Node.js Express backend**.

---

## 📁 Project Structure

openai-sql-generator/
├── client/ → React frontend (Vite)
├── server/ → Express backend (Node.js)


---

## 🚀 Features

- 🔁 Converts plain English to SQL
- ✂️ Copy SQL button
- 🔐 Uses OpenAI or OpenRouter API
- 💡 Clean, responsive UI
- 🛡️ Error handling and loading state

---

## ⚙️ Setup Instructions

### 1. Clone the Repository


git clone https://github.com/your-username/openai-sql-generator.git
cd openai-sql-generator

## For Client (React):

cd client
npm install

## For Server (Node.js):

cd ../server
npm install

## Configure API Key
In the server folder, create a .env file:

OPENAI_API_KEY=your_key_here

👉 You can get:

OpenAI Key from: https://platform.openai.com/account/api-keys
OpenRouter Key (Free): https://openrouter.ai

## Running the App

Run Server (Port: 5000)
cd server
npm run dev

Run Client (Port: 5173)
cd ../client
npm run dev

## Built With

Frontend: React + Vite
Backend: Node.js + Express
API Models: OpenAI / OpenRouter
Styling: CSS + inline styling (fully responsive)
