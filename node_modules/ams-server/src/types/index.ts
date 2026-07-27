export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMINISTRATOR = 'ADMINISTRATOR',
  FARMER = 'FARMER',
  EXTENSION_OFFICER = 'EXTENSION_OFFICER',
  INVENTORY_OFFICER = 'INVENTORY_OFFICER',
  VIEWER = 'VIEWER'
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  fullName: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
