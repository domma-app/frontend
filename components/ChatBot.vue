<template>
  <div
    :class="[
      expanded ? 'w-full' : 'fixed bottom-4 right-4 z-50 w-96 max-w-full',
      'flex flex-col',
    ]"
  >
    <!-- Chat button (when chat is closed and not expanded) -->
    <button
      v-if="!isChatOpen && !expanded"
      @click="openChat"
      class="ml-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label="Open chat assistant"
    >
      <svg
        class="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        ></path>
      </svg>
    </button>

    <!-- Chat container (when chat is open or expanded) -->
    <div
      v-if="isChatOpen || expanded"
      class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden transition-all"
      :class="[expanded ? 'h-[600px]' : 'h-[500px] max-h-[80vh] shadow-2xl']"
    >
      <!-- Chat header -->
      <div
        class="bg-green-500 text-white px-4 py-3 flex justify-between items-center"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-white rounded-full p-1 mr-2">
            <svg
              class="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.294 48.294 0 01-8.135-1.587c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              ></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold">DOMMA Financial Assistant</h3>
            <div class="flex items-center text-xs text-green-100">
              <span class="block h-2 w-2 rounded-full bg-green-100 mr-1"></span>
              <span>Powered by Gemini</span>
            </div>
          </div>
        </div>
        <button
          v-if="!expanded"
          @click="closeChat"
          class="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Chat messages -->
      <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto">
        <div
          v-if="currentConversation.messages.length === 0"
          class="flex items-center justify-center h-full flex-col"
        >
          <div class="bg-green-100 rounded-full p-3 mb-3">
            <svg
              class="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.294 48.294 0 01-8.135-1.587c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-700 mb-1">
            DOMMA Financial Assistant
          </h3>
          <p class="text-center text-sm text-gray-500 max-w-xs">
            Ask me about budgeting, saving strategies, or any financial
            questions you have!
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(message, idx) in currentConversation.messages"
            :key="idx"
            :class="[
              'max-w-[85%] rounded-lg p-3',
              message.role === 'user'
                ? 'bg-green-100 ml-auto text-gray-800'
                : 'bg-gray-100 mr-auto text-gray-800',
            ]"
          >
            <p
              v-if="message.role === 'assistant'"
              class="text-xs text-gray-500 mb-1"
            >
              DOMMA Assistant
            </p>
            <p v-else class="text-xs text-gray-500 mb-1">You</p>
            <div
              v-if="message.role === 'assistant'"
              class="prose prose-sm max-w-none"
              v-html="renderMarkdown(message.content)"
            ></div>
            <p v-else class="whitespace-pre-wrap">{{ message.content }}</p>
            <p class="text-xs text-gray-400 mt-1 text-right">
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="flex items-center space-x-2 mt-4">
          <div class="bg-gray-200 p-3 rounded-lg">
            <div class="flex space-x-1">
              <div
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style="animation-delay: 0ms"
              ></div>
              <div
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style="animation-delay: 150ms"
              ></div>
              <div
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style="animation-delay: 300ms"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="border-t border-gray-200 p-3">
        <form @submit.prevent="sendMessage" class="flex items-center">
          <input
            v-model="userInput"
            type="text"
            placeholder="Type your message..."
            class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 disabled:bg-green-300 transition-colors"
            :disabled="isLoading || !userInput.trim()"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </form>

        <!-- Suggestions -->
        <div class="mt-2 flex flex-wrap gap-2">
          <button
            v-for="(suggestion, idx) in suggestions"
            :key="idx"
            @click="selectSuggestion(suggestion)"
            class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-full transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useGeminiService } from "~/services";
import type { GeminiMessage, ChatConversation } from "~/types/api";

// Markdown rendering function - Simple version using regex
// This is a basic implementation without a dependency
// For a more robust solution, install markdown-it or marked
const renderMarkdown = (text: string) => {
  if (!text) return "";

  // Safety first - escape HTML
  const escapeHtml = (html: string) => {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  let content = escapeHtml(text);

  // Convert markdown to HTML

  // Headers
  content = content.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  content = content.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  content = content.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold and italic
  content = content.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  content = content.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Code blocks with syntax highlighting
  content = content.replace(
    /```([a-zA-Z]*)\n([\s\S]*?)\n```/gim,
    '<pre class="bg-gray-800 text-gray-100 p-2 rounded overflow-x-auto"><code class="language-$1">$2</code></pre>'
  );

  // Inline code
  content = content.replace(
    /`(.*?)`/gim,
    '<code class="bg-gray-200 text-gray-800 px-1 py-0.5 rounded">$1</code>'
  );

  // Lists
  content = content.replace(/^\s*\d+\.\s+(.*$)/gim, "<li>$1</li>");
  content = content.replace(/^\s*[\*\-]\s+(.*$)/gim, "<li>$1</li>");
  content = content.replace(/<\/li>\n<li>/gim, "</li><li>");
  content = content.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

  // Links
  content = content.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>'
  );

  // Line breaks
  content = content.replace(/\n/gim, "<br>");

  return content;
};

// Define props
interface Props {
  expanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false,
});

// Helper functions
const generateId = () => {
  return `conv-${Math.random().toString(36).substring(2, 11)}`;
};

// Reactive references
const isChatOpen = ref(props.expanded);
const userInput = ref("");
const isLoading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

// Create a unique ID for the conversation
const conversationId = ref(generateId());

// Active conversation
const currentConversation = ref<ChatConversation>({
  id: conversationId.value,
  title: "New Conversation",
  messages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Chat suggestions
const suggestions = [
  "How can I budget better?",
  "Tips for saving money?",
  "How to track expenses?",
  "What's a good investment strategy for students?",
  "Help with financial goals",
];

// Service instance
const geminiService = useGeminiService();

// Methods
const openChat = () => {
  isChatOpen.value = true;
};

const closeChat = () => {
  isChatOpen.value = false;
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const userMessage: GeminiMessage = {
    role: "user",
    content: userInput.value.trim(),
    timestamp: new Date(),
  };

  // Add user message to the conversation
  currentConversation.value.messages.push(userMessage);
  currentConversation.value.updatedAt = new Date();

  // Clear input and show loading state
  userInput.value = "";
  isLoading.value = true;

  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  try {
    // Call Gemini API
    const response = await geminiService.sendMessage(
      currentConversation.value.messages,
      userMessage.content
    );

    // Handle response
    if (response.error) {
      // Add error message
      currentConversation.value.messages.push({
        role: "assistant",
        content: `I'm sorry, I encountered an error: ${response.error}`,
        timestamp: new Date(),
      });
    } else if (response.message) {
      // Add AI response
      currentConversation.value.messages.push({
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    currentConversation.value.messages.push({
      role: "assistant",
      content:
        "Sorry, I had trouble processing your request. Please try again later.",
      timestamp: new Date(),
    });
  } finally {
    isLoading.value = false;
    currentConversation.value.updatedAt = new Date();

    // Scroll to bottom
    await nextTick();
    scrollToBottom();

    // Save conversation to local storage
    saveConversation();
  }
};

const selectSuggestion = (suggestion: string) => {
  userInput.value = suggestion;
  sendMessage();
};

const formatTime = (timestamp?: Date) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const saveConversation = () => {
  // In a real implementation, we would save to the server
  // For now, just save to localStorage
  try {
    const conversations = JSON.parse(
      localStorage.getItem("chatConversations") || "[]"
    );
    const existingIndex = conversations.findIndex(
      (conv: ChatConversation) => conv.id === currentConversation.value.id
    );

    if (existingIndex >= 0) {
      conversations[existingIndex] = currentConversation.value;
    } else {
      conversations.push(currentConversation.value);
    }

    localStorage.setItem("chatConversations", JSON.stringify(conversations));
  } catch (error) {
    console.error("Error saving conversation to localStorage:", error);
  }
};

const loadConversation = () => {
  // In a real implementation, we would load from the server
  // For now, just load from localStorage
  try {
    const conversations = JSON.parse(
      localStorage.getItem("chatConversations") || "[]"
    );
    const existingConv = conversations.find(
      (conv: ChatConversation) => conv.id === conversationId.value
    );

    if (existingConv) {
      // Convert date strings back to Date objects
      existingConv.createdAt = new Date(existingConv.createdAt);
      existingConv.updatedAt = new Date(existingConv.updatedAt);
      existingConv.messages.forEach((msg: GeminiMessage) => {
        if (msg.timestamp) msg.timestamp = new Date(msg.timestamp);
      });

      currentConversation.value = existingConv;
    }
  } catch (error) {
    console.error("Error loading conversation from localStorage:", error);
  }
};

// Watch for changes to messages to scroll to bottom
watch(
  () => currentConversation.value.messages.length,
  () => {
    nextTick(scrollToBottom);
  }
);

// Load conversation on mount
onMounted(() => {
  loadConversation();
});
</script>

<style scoped>
/* Smooth scrolling for the messages container */
.overflow-y-auto {
  scroll-behavior: smooth;
}

/* Custom bounce animation for the typing indicator */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}

/* Add styling for markdown content */
.prose h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.prose h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.prose h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose ul {
  list-style-type: disc;
}

.prose ol {
  list-style-type: decimal;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose pre {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  background-color: #1e293b;
  padding: 0.75rem;
  color: #f8fafc;
  overflow-x: auto;
}

.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
}

.prose code:not(pre code) {
  background-color: #e2e8f0;
  color: #1e293b;
}

.prose table {
  border-collapse: collapse;
  margin: 0.5rem 0;
  width: 100%;
}

.prose table th,
.prose table td {
  border: 1px solid #cbd5e1;
  padding: 0.25rem 0.5rem;
  text-align: left;
}

.prose table th {
  background-color: #f1f5f9;
  font-weight: bold;
}
</style>
