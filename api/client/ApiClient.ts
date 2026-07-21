import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
    private token: string | null = null;

    constructor(private readonly context: APIRequestContext, private readonly baseUrl: string) {}

    setToken(token: string) {
        this.token = token;
    }

    private headers(): Record<string, string> {
        return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }

    get(path: string): Promise<APIResponse> {
        return this.context.get(`${this.baseUrl}${path}`, { headers: this.headers() });
    }

    post(path: string, data: unknown): Promise<APIResponse> {
        return this.context.post(`${this.baseUrl}${path}`, { data, headers: this.headers() });
    }

    patch(path: string, data: unknown): Promise<APIResponse> {
        return this.context.patch(`${this.baseUrl}${path}`, { data, headers: this.headers() });
    }

    delete(path: string): Promise<APIResponse> {
        return this.context.delete(`${this.baseUrl}${path}`, { headers: this.headers() });
    }
}