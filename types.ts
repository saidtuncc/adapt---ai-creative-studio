export interface UploadedFile {
  file: File;
  previewUrl: string;
  base64: string; // Data URL format for preview
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GenerationState {
  status: GenerationStatus;
  resultImageUrl: string | null;
  errorMessage: string | null;
}

export const MODEL_NAME = 'gemini-2.5-flash-image';