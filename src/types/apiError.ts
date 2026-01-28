export interface ApiError {
  status?: number;
  message?: string;
  originalError?: unknown;
  response?: {
    status?: number;
    data?: {
      error?: {
        message?: string;
      };
    };
  };
}
