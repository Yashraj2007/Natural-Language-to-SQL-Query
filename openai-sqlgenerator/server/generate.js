import openaiClient from "./api.js";

// Converts plain English to SQL using GPT-3.5 (chat-based) or DaVinci (completion-based)
const generate = async (queryDescription, method = "chat") => {
  if (!queryDescription || typeof queryDescription !== "string") {
    throw new Error("Invalid or missing query description");
  }

  // Option 1: Using text-davinci-003 (completion API)
  const daVinci = async (text) => {
    const response = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert the following natural language description into a SQL query:\n\n${text}`,
      max_tokens: 100,
      temperature: 0,
    });

    return response.data.choices[0].text.trim();
  };

  // Option 2: Using gpt-3.5-turbo (chat API)
  const chatGPT = async (text) => {
    const messages = [
      { role: "system", content: "You are a translator that converts plain English into SQL." },
      { role: "user", content: `Convert the following into a SQL query:\n\n${text}` },
    ];

    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    return response.data.choices[0].message.content.trim();
  };

  // Choose which model to use
  if (method === "davinci") {
    return await daVinci(queryDescription);
  } else {
    return await chatGPT(queryDescription); // default
  }
};

export default generate;
