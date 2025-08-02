import axios from "axios";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const API_URL = "https://api.openai.com/v1/chat/completions";

export const getGPTSuggestion = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        // model: "gpt-3.5-turbo",
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        // temperature: 0.7,
        // max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        // timeout: 10000,
      }
    );

    return response.data.choices[0]?.message?.content?.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to fetch suggestion. Please try again.");
  }
};
