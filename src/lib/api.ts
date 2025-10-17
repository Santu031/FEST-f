const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface Member {
  _id?: string;
  id: string;
  name: string;
  role: string;
  bio: string;
  joinYear: number;
  photo?: string;
  email?: string;
  phone?: string;
  responsibilities?: string[];
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(password: string): Promise<{ success: boolean; token: string }> {
    const result = await this.request<{ success: boolean; token: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ password }),
      }
    );
    
    if (result.success && result.token) {
      this.token = result.token;
      localStorage.setItem('authToken', result.token);
    }
    
    return result;
  }

  async verify(): Promise<{ success: boolean; isAdmin: boolean }> {
    return this.request('/auth/verify');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Member methods
  async getMembers(): Promise<Member[]> {
    return this.request('/members');
  }

  async getMember(id: string): Promise<Member> {
    return this.request(`/members/${id}`);
  }

  async createMember(member: Partial<Member>): Promise<Member> {
    return this.request('/members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    return this.request(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMember(id: string): Promise<{ success: boolean }> {
    return this.request(`/members/${id}`, {
      method: 'DELETE',
    });
  }

  async resetMembers(): Promise<{ success: boolean; count: number }> {
    return this.request('/members/reset', {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const api = new ApiClient(API_URL);
export type { Member };
