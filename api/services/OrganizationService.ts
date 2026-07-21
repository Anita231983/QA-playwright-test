import { expect } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { OrganizationApiPayload, OrganizationApiResponse } from '../types/organization.types';

export class OrganizationService {
  constructor(private readonly client: ApiClient) {}

  async createOrganization(payload: OrganizationApiPayload): Promise<OrganizationApiResponse> {
    const response = await this.client.post('/api/organizations/organizations/', payload);
    expect(response.ok(), `Create organization failed: ${response.status()} ${await response.text()}`).toBeTruthy();
    return response.json();
  }

  async updateOrganization(slug: string, payload: Partial<OrganizationApiPayload>): Promise<OrganizationApiResponse> {
    const response = await this.client.patch(`/api/organizations/organizations/${slug}/`, payload);
    expect(response.ok(), `Update organization failed: ${response.status()} ${await response.text()}`).toBeTruthy();
    return response.json();
  }

  async deleteOrganization(slug: string): Promise<void> {
    const response = await this.client.delete(`/api/organizations/organizations/${slug}/`);
    expect(response.ok(), `Delete organization failed: ${response.status()} ${await response.text()}`).toBeTruthy();
  }
}