import { useApiClient } from "./client";
import type { ChallengeListResponse, ChallengeResponse } from "~/types/api";

/**
 * Challenge service for managing challenges
 */
export class ChallengeService {
  private readonly ENDPOINTS = {
    CHALLENGE: "/challenges",
    SUMMARY: "/challenges/summary",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Get all challenges
   */
  async getChallenges(): Promise<ChallengeListResponse> {
    const response = await this.apiClient.get<ChallengeListResponse>(
      this.ENDPOINTS.CHALLENGE
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as ChallengeListResponse;
  }

  /**
   * Get a specific challenge
   */
  async getChallenge(id: string | number): Promise<ChallengeResponse> {
    const response = await this.apiClient.get<ChallengeResponse>(
      `${this.ENDPOINTS.CHALLENGE}/${id}`
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as ChallengeResponse;
  }
}

// Create a composable to use the challenge service
export function useChallengeService() {
  return new ChallengeService();
}
