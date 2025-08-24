// API utility functions for the AI Power Dashboard

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  user?: T;
  settings?: T;
  members?: T;
  member?: T;
  error?: string;
  message?: string;
  token?: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.error || 'An error occurred');
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error occurred');
  }
}

// Authentication APIs
export const authApi = {
  login: async (email: string, password: string) => {
    console.log('Frontend login attempt:', { email, password: '***' });
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    console.log('Login API response:', result);
    return result;
  },

  signup: async (email: string, password: string, name: string, confirmPassword: string) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, confirmPassword }),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// User APIs
export const userApi = {
  getProfile: async () => {
    return apiRequest('/user/profile');
  },

  updateProfile: async (name: string, email: string) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    });
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiRequest('/user/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Team APIs
export const teamApi = {
  getMembers: async () => {
    return apiRequest('/team');
  },

  inviteMember: async (email: string, role: string) => {
    return apiRequest('/team', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  },

  updateMemberRole: async (id: string, role: string) => {
    return apiRequest(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  removeMember: async (id: string) => {
    return apiRequest(`/team/${id}`, {
      method: 'DELETE',
    });
  },
};

// Billing APIs
export const billingApi = {
  getBillingData: async () => {
    return apiRequest('/billing');
  },
};

// Settings APIs
export const settingsApi = {
  getSettings: async () => {
    return apiRequest('/settings');
  },

  updateSettings: async (settings: any) => {
    return apiRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

export { ApiError };
