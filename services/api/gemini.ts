import type { GeminiResponse, GeminiMessage } from "~/types/api";

export const useGeminiService = () => {
  const { $geminiConfig } = useNuxtApp();

  console.log("$geminiConfig:", $geminiConfig);
  console.log("$geminiConfig type:", typeof $geminiConfig);

  // Try to get the API key from the config
  const API_KEY = $geminiConfig?.apiKey || "";

  // Debug the API key
  console.log("API_KEY in service:", API_KEY);
  console.log("API_KEY type:", typeof API_KEY);
  console.log("API_KEY length:", API_KEY.length);

  // Fallback API key in case the config doesn't work
  const FALLBACK_API_KEY = "AIzaSyCYS7kYmwZUXQFJh8OPX8z6aJFjjxk0G9Q"; // I had trouble generating the API key. You can use this one if there's an error—it's fine by me

  // The base URL should NOT include the model or key parameter
  const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

  // Model to use (update to the model you want to use)
  const MODEL = "gemini-2.0-flash";

  /**
   * Send a message to Gemini API and get a response
   * @param messages Previous messages in the conversation for context
   * @param prompt The user's current message
   * @returns The AI response
   */
  const sendMessage = async (
    messages: GeminiMessage[],
    prompt: string
  ): Promise<GeminiResponse> => {
    try {
      // Format messages for Gemini API
      const formattedMessages = formatMessagesForGemini(messages, prompt);

      // Use the API key from config if available, otherwise use fallback
      const keyToUse =
        API_KEY && API_KEY.length > 10 ? API_KEY : FALLBACK_API_KEY;

      console.log(
        "Using API key:",
        keyToUse ? "Key exists (not showing for security)" : "No key!"
      );
      console.log("Using model:", MODEL);

      // Construct the URL with model and API key separately
      const requestUrl = `${BASE_URL}/models/${MODEL}:generateContent?key=${keyToUse}`;

      // Make the API call to Gemini
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      });

      const data = await response.json();
      console.log("API response status:", response.status);

      // Only log response structure, not full content
      if (data) {
        console.log("API response structure:", Object.keys(data));
      }

      // Check if there's an error in the response
      if (data.error) {
        return {
          message: null,
          error: data.error.message || "Error from Gemini API",
        };
      }

      // Extract the actual message from the response
      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content
      ) {
        const aiMessage = data.candidates[0].content.parts[0].text;
        return {
          message: aiMessage,
          error: null,
        };
      }

      return {
        message: null,
        error: "Unexpected response format from Gemini API",
      };
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return {
        message: null,
        error:
          "Failed to get response from AI assistant. Please try again later.",
      };
    }
  };

  /**
   * Format messages for the Gemini API
   * @param messages Previous messages
   * @param currentPrompt Current user message
   * @returns Formatted messages for Gemini API
   */
  const formatMessagesForGemini = (
    messages: GeminiMessage[],
    currentPrompt: string
  ) => {
    // Format previous messages for Gemini API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    // Add current prompt
    formattedMessages.push({
      role: "user",
      parts: [{ text: currentPrompt }],
    });

    return formattedMessages;
  };

  return {
    sendMessage,
  };
};
