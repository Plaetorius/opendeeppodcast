export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  asset_id?: string;
  resource_type: string;
  format?: string;
  version?: number;
  type?: string;
  created_at?: string;
}