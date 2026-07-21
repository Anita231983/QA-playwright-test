export type OrganizationApiPayload = {
  admin_email: string;
  admin_first_name: string;
  admin_last_name: string;
  admin_password: string;
  admin_phone: string;
  country: string;
  name: string;
  organization_logo?: string;
  plan_type: number;
  send_mail_notifications: boolean;
  slug: string;
  status: string;
  timezone: string;
  trial_days: string;
};

export type OrganizationApiResponse = Omit<OrganizationApiPayload, 'trial_days'> & {
  id: string | number;
  trial_days: number;
};