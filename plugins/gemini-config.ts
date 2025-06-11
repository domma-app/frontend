// This plugin creates a composable to access the Gemini API key and settings

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Get API key and ensure it's a string
  const apiKeyValue = config.geminiApiKey || "";

  console.log("Raw geminiApiKey value:", apiKeyValue);

  const geminiConfig = {
    apiKey: apiKeyValue,
  };

  console.log("Gemini config loaded");
  console.log("Gemini API key exists:", !!geminiConfig.apiKey);
  console.log("Gemini API key type:", typeof geminiConfig.apiKey);

  return {
    provide: {
      geminiConfig,
    },
  };
});
