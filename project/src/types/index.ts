export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: number;
  userId: number;
  assetName: string;
  categoryId: number;
  statusId: number;
  purchaseDate: string;
  warrantyExpiryDate?: string;
  assetImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  category?: AssetCategory;
  status?: AssetStatus;
}

export interface AssetCategory {
  id: number;
  categoryName: string;
}

export interface AssetStatus {
  id: number;
  statusName: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface CreateAssetRequest {
  assetName: string;
  categoryId: number;
  statusId: number;
  purchaseDate: string;
  warrantyExpiryDate?: string;
  assetImageUrl?: string;
}

export interface UpdateAssetRequest extends CreateAssetRequest {
  id: number;
}