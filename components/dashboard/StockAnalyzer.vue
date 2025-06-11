<template>
  <section
    :class="[
      'rounded-lg shadow-sm p-6',
      highlight ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white',
    ]"
  >
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <svg
        v-if="highlight"
        class="w-6 h-6 text-green-500 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        ></path>
      </svg>
      Stock Analysis & Recommendation
      <span v-if="highlight" class="ml-2 text-sm font-normal text-green-600">
        (New feature!)
      </span>
    </h2>

    <div class="flex items-center space-x-2 mb-4">
      <svg
        class="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span class="text-sm text-gray-600"
        >Upload financial report (PDF) for stock investment recommendation</span
      >
    </div>

    <!-- File Upload Section -->
    <div
      v-if="!isAnalysisComplete"
      class="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative"
      @click="triggerFileInput"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      @drop.prevent="onFileDrop"
      :class="{ 'bg-gray-50 border-green-300': dragover }"
    >
      <!-- Loading Overlay -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10 rounded-lg"
      >
        <div
          class="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-lg font-medium text-gray-800">Analyzing report...</p>
        <p class="text-sm text-gray-500 mt-1">This may take a moment</p>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept="application/pdf"
        class="hidden"
        @change="onFileSelect"
      />

      <div v-if="selectedFile">
        <svg
          class="w-12 h-12 text-green-500 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p class="text-lg font-medium text-gray-800">{{ selectedFile.name }}</p>
        <p class="text-sm text-gray-500 mt-1">
          {{ formatFileSize(selectedFile.size) }}
        </p>

        <div class="mt-6">
          <button
            @click.stop="startAnalysis"
            class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Analyze Report</span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          </button>
          <button
            @click.stop="resetFileUpload"
            class="ml-3 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-400"
            :disabled="isLoading"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-else>
        <svg
          class="w-12 h-12 text-gray-400 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p class="text-gray-700 mb-1">Drag & drop your financial report here</p>
        <p class="text-sm text-gray-500">
          or <span class="text-green-500 font-medium">browse files</span>
        </p>
        <p class="text-xs text-gray-400 mt-2">Supports PDF files up to 10MB</p>
      </div>
    </div>

    <!-- Global Loading Overlay -->
    <div
      v-if="isLoading && isAnalysisComplete"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div class="flex flex-col items-center">
          <div
            class="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"
          ></div>
          <h3 class="text-lg font-medium text-gray-800 mb-1">
            Analyzing your report
          </h3>
          <p class="text-gray-500 text-center">
            We're processing your financial data to provide accurate stock
            recommendations.
          </p>
        </div>
      </div>
    </div>

    <!-- Error Notification -->
    <div
      v-if="showError === true"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div class="flex flex-col items-center">
          <div
            class="w-16 h-16 flex items-center justify-center mb-4 bg-red-100 rounded-full"
          >
            <svg
              class="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-800 mb-1">
            Analysis Failed
          </h3>
          <p class="text-gray-500 text-center mb-4">{{ errorMessage }}</p>
          <button
            @click="closeError"
            class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- No Analysis Yet State -->
    <!-- <div v-if="!isAnalysisComplete && !isLoading && !hasPerformedAnalysis && !selectedFile" class="py-10 text-center bg-gray-50 rounded-lg">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-600 mb-2">No Analysis Results Yet</h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">Upload a financial report PDF to get stock recommendations based on financial metrics.</p>
      <button 
        @click="triggerFileInput"
        class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 inline-flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        Upload Report
      </button>
    </div> -->

    <!-- Analysis Results -->
    <div v-if="isAnalysisComplete && hasPerformedAnalysis">
      <!-- API Error Notice -->
      <div
        v-if="apiErrorOccurred"
        class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <p class="text-sm text-yellow-700">
            <span class="font-medium">Note:</span> Using sample data due to an
            API connection issue. These values are for demonstration purposes
            only.
          </p>
        </div>
      </div>

      <!-- Recommendation Summary -->
      <div class="mb-6 p-4 rounded-lg" :class="recommendationClass">
        <div class="flex items-start">
          <div class="flex-shrink-0 mt-0.5">
            <svg
              v-if="isRecommended"
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-white">
              {{ recommendationText }}
            </h3>
            <p class="mt-1 text-sm text-white opacity-90">
              {{ recommendationDescription }}
            </p>
            <div class="mt-2 bg-white bg-opacity-20 rounded-full h-2.5">
              <div
                class="bg-white h-2.5 rounded-full"
                :style="`width: ${analysisData['rekomendasi (%)']}%`"
              ></div>
            </div>
            <p class="mt-1 text-xs text-white opacity-80">
              Recommendation score:
              {{ analysisData["rekomendasi (%)"].toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>

      <!-- Metrics Explanation -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 class="text-md font-medium text-gray-800 mb-3">
          Financial Health Metrics
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="(value, key) in analysisData.avg_metrics"
            :key="key"
            class="bg-white rounded-lg p-3 shadow-sm"
          >
            <div class="flex justify-between items-center mb-1">
              <p class="text-sm font-medium text-gray-800">
                {{ formatMetricName(key) }}
              </p>
              <div
                :class="getMetricIndicatorClass(key, value)"
                class="rounded-full w-3 h-3"
              ></div>
            </div>
            <p class="text-lg font-semibold">
              {{ formatMetricValue(key, value) }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ getMetricDescription(key) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-blue-50 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">
              What do these metrics mean?
            </h3>
            <div class="mt-2 text-sm text-blue-700">
              <p>
                These financial metrics help assess the company's overall
                health:
              </p>
              <ul class="list-disc pl-5 mt-1 space-y-1">
                <li>
                  <strong>ROE:</strong> Return on Equity - Higher is better
                  (measures profitability)
                </li>
                <li>
                  <strong>ROA:</strong> Return on Assets - Higher is better
                  (measures efficiency)
                </li>
                <li>
                  <strong>D/E Ratio:</strong> Debt to Equity - Lower is
                  generally safer
                </li>
                <li>
                  <strong>Equity Ratio:</strong> Higher percentages indicate
                  financial strength
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end">
        <button
          @click="resetAnalysis"
          class="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Analyze Another Report
        </button>
        <button
          class="ml-3 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Save Analysis
        </button>
        <button
          v-if="highlight"
          class="ml-3 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
            ></path>
          </svg>
          Share Analysis
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { StockAnalysisResult } from "~/types/api";
import { useStockService } from "~/services";

// Define props
interface Props {
  highlight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  highlight: false,
});

// Service instance
const stockService = useStockService();

// File upload refs
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const dragover = ref(false);
const isAnalysisComplete = ref(false);
const isLoading = ref(false);
const showError = ref(false);
const errorMessage = ref(
  "An error occurred while analyzing your report. Please try again."
);
const apiErrorOccurred = ref(false);

// Analysis data
const analysisData = ref<StockAnalysisResult>({
  avg_metrics: {
    "ROE (%)": 8.76,
    "ROA (%)": 0.94,
    "D/E Ratio": 2.32,
    "Equity Ratio (%)": 10.62,
    "A/E Ratio": 9.49,
    Leverage: 2.32,
  },
  "rekomendasi (%)": 49.26,
});

// Track if user has actually performed an analysis
const hasPerformedAnalysis = ref(false);

// Open file dialog
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle file selection
const onFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
  }
};

// Handle file drop
const onFileDrop = (event: DragEvent) => {
  dragover.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    selectedFile.value = event.dataTransfer.files[0];
  }
};

// Reset file upload
const resetFileUpload = () => {
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Start analysis
const startAnalysis = async () => {
  if (!selectedFile.value) return;

  isLoading.value = true;
  showError.value = false;
  apiErrorOccurred.value = false;

  try {
    // Call the service to analyze the report
    const result = await stockService.analyzeFinancialReport(
      selectedFile.value
    );
    analysisData.value = result;
    isAnalysisComplete.value = true;
    hasPerformedAnalysis.value = true;

    // If we're using default data due to an API error
    if (
      result &&
      result["rekomendasi (%)"] === 49.26 &&
      result.avg_metrics &&
      result.avg_metrics["ROE (%)"] === 8.15
    ) {
      apiErrorOccurred.value = true;
      // Display a toast or subtle notification instead of a full error
      console.warn("Using fallback data due to API issues");
    }
  } catch (error) {
    console.error("Error analyzing file:", error);
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "An error occurred while analyzing your report. Please try again.";
    showError.value = true;
    isAnalysisComplete.value = false;
  } finally {
    isLoading.value = false;
  }
};

// Reset analysis to upload a new file
const resetAnalysis = () => {
  isAnalysisComplete.value = false;
  hasPerformedAnalysis.value = false;
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Close error notification
const closeError = () => {
  showError.value = false;
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Format metric name for display
const formatMetricName = (key: string | number): string => {
  return String(key).replace(" (%)", "");
};

// Format metric value for display
const formatMetricValue = (key: string | number, value: number): string => {
  const keyStr = String(key);
  if (keyStr.includes("%")) {
    return `${value.toFixed(2)}%`;
  }
  return value.toFixed(2);
};

// Get metric description
const getMetricDescription = (key: string | number): string => {
  const keyStr = String(key);
  const descriptions: Record<string, string> = {
    "ROE (%)": "Return on equity shows profitability from investments",
    "ROA (%)":
      "Return on assets shows how efficiently assets generate earnings",
    "D/E Ratio": "Debt-to-equity ratio shows financial leverage",
    "Equity Ratio (%)": "Percentage of assets funded by equity",
    "A/E Ratio": "Assets-to-equity ratio indicates financial leverage",
    Leverage: "Use of borrowed capital to increase potential return",
  };

  return descriptions[keyStr] || "Financial health indicator";
};

// Get color indicator for metrics based on value
const getMetricIndicatorClass = (
  key: string | number,
  value: number
): string => {
  const keyStr = String(key);

  // This is a simplified evaluation - in a real app you'd want more nuanced thresholds
  if (keyStr === "ROE (%)" || keyStr === "ROA (%)") {
    if (value > 10) return "bg-green-500";
    if (value > 5) return "bg-yellow-500";
    return "bg-red-500";
  }

  if (keyStr === "D/E Ratio" || keyStr === "Leverage") {
    if (value < 1) return "bg-green-500";
    if (value < 3) return "bg-yellow-500";
    return "bg-red-500";
  }

  if (keyStr === "Equity Ratio (%)") {
    if (value > 30) return "bg-green-500";
    if (value > 15) return "bg-yellow-500";
    return "bg-red-500";
  }

  if (keyStr === "A/E Ratio") {
    if (value < 5) return "bg-green-500";
    if (value < 10) return "bg-yellow-500";
    return "bg-red-500";
  }

  return "bg-gray-500";
};

// Computed properties for recommendation styling
const isRecommended = computed(() => {
  return analysisData.value["rekomendasi (%)"] >= 50;
});

const recommendationClass = computed(() => {
  return isRecommended.value ? "bg-green-600" : "bg-red-600";
});

const recommendationText = computed(() => {
  return isRecommended.value ? "Recommended" : "Not Recommended";
});

const recommendationDescription = computed(() => {
  if (isRecommended.value) {
    return "Based on the financial analysis, this stock shows healthy metrics and could be a good addition to your portfolio.";
  } else {
    return "Based on the financial analysis, this stock shows concerning metrics and may not be suitable for your investment portfolio at this time.";
  }
});
</script>
