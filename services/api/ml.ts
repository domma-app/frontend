import type {
  ExpenditureClassification,
  ExpenditureClassificationRequest,
  ForecastResponse,
  MonthlyForecastRequest,
  WeeklyForecastRequest,
} from "~/types/api";

/**
 * Service for making calls to the ML APIs for expenditure classification and forecasting
 */
export const useMlService = () => {
  const config = useRuntimeConfig();
  const { $api } = useNuxtApp();
  const classificationBaseUrl = config.public
    .expenditureClassificationBaseUrl as string;
  const forecastingBaseUrl = config.public
    .expenditureForecastingBaseUrl as string;

  /**
   * Classify an expenditure amount
   * @param amount The expenditure amount to classify
   * @returns A classification result
   */
  const classifyExpenditure = async (
    amount: number | string
  ): Promise<ExpenditureClassification> => {
    try {
      const response = await fetch(`${classificationBaseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: String(amount),
        } as ExpenditureClassificationRequest),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to classify expenditure: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error classifying expenditure:", error);
      // Return a default classification in case of error
      return {
        amount: Number(amount),
        cluster: 0,
        category: "Unknown",
        message: "Unable to classify at this time.",
        emoji: "⚠️",
      };
    }
  };

  /**
   * Forecast weekly expenditures based on past data
   * @param weeklyData Past 4 weeks of expenditure data
   * @returns A forecast result for the next 4 weeks
   */
  const forecastWeekly = async (weeklyData: {
    [key: string]: number;
  }): Promise<ForecastResponse> => {
    try {
      const request: WeeklyForecastRequest = {
        duration: "4_weeks",
        forecast: weeklyData,
      };

      const response = await fetch(`${forecastingBaseUrl}/forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to forecast weekly expenditure: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error forecasting weekly expenditure:", error);
      // Return a default forecast in case of error
      return {
        duration: "4_weeks",
        input_forecast: weeklyData,
        future_forecast: {
          "Week-5": 0,
          "Week-6": 0,
          "Week-7": 0,
          "Week-8": 0,
        },
      };
    }
  };

  /**
   * Forecast monthly expenditures based on past data
   * @param monthlyData Past 6 months of expenditure data
   * @returns A forecast result for the next month
   */
  const forecastMonthly = async (monthlyData: {
    [key: string]: number;
  }): Promise<ForecastResponse> => {
    try {
      const request: MonthlyForecastRequest = {
        duration: "6_months",
        forecast: monthlyData,
      };

      const response = await fetch(`${forecastingBaseUrl}/forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to forecast monthly expenditure: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error forecasting monthly expenditure:", error);
      // Return a default forecast in case of error
      const lastMonth =
        Object.keys(monthlyData)[Object.keys(monthlyData).length - 1];
      const nextMonth = getNextMonth(lastMonth);

      // Return a default forecast in case of error
      return {
        duration: "6_months",
        input_forecast: monthlyData,
        future_forecast: {
          [nextMonth]: 0,
        },
      };
    }
  };

  /**
   * Helper function to get the next month name
   */
  const getNextMonth = (currentMonth: string): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentIndex = months.findIndex((m) => m === currentMonth);
    if (currentIndex === -1) return "Next Month";

    return months[(currentIndex + 1) % 12];
  };

  return {
    classifyExpenditure,
    forecastWeekly,
    forecastMonthly,
  };
};
