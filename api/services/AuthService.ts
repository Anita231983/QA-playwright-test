import { expect } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';

export class AuthService {
  constructor(private readonly client: ApiClient) {}

  async loginWithAPI(email: string, password: string): Promise<string> {
    const response = await this.client.post('/api/accounts/login/', {
      email,
      password,
      branch_id: 0,
      remember_me: true,
    });

    expect(response.ok(), `Login failed: ${response.status()} ${await response.text()}`);

    const body = await response.json();
    const token: string = body.access;
    this.client.setToken(token);
    return token;
  }
}