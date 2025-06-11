import { useApiClient } from "./client";
import type { 
  ApiResponse,
  UserProfile,
  GetProfileResponse,
  UpdateProfileResponse,
  UploadProfilePictureResponse
} from "~/types/api";

/**
 * Profile service for user profile management
 */
export class ProfileService {
  private readonly ENDPOINTS = {
    PROFILE: "/profile",
    PROFILE_PICTURE: "/profile/picture",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<GetProfileResponse> {
    const response = await this.apiClient.get<GetProfileResponse>(
      this.ENDPOINTS.PROFILE
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as GetProfileResponse;
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: Partial<UserProfile>): Promise<UpdateProfileResponse> {
    const response = await this.apiClient.put<UpdateProfileResponse>(
      this.ENDPOINTS.PROFILE,
      profileData
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as UpdateProfileResponse;
  }

  /**
   * Upload profile picture
   */
  async uploadProfilePicture(file: File): Promise<UploadProfilePictureResponse> {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Custom headers for multipart/form-data - empty to let browser set boundary
    const headers = {}; 
    
    const response = await this.apiClient.request<UploadProfilePictureResponse>(
      this.ENDPOINTS.PROFILE_PICTURE,
      {
        method: 'POST',
        body: formData,
        headers,
      }
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as UploadProfilePictureResponse;
  }
}

/**
 * Create a composable to use the profile service
 */
export function useProfileService() {
  return new ProfileService();
}
