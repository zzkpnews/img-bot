interface UploadResponse {
  status: 'ok' | 'err' | 'warn';
  url?: string;
  id?: string;
  message?: string;
}

export { UploadResponse };