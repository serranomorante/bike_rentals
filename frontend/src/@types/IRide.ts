export interface IRide {
  slug: string;
  title: string;
  basePrice: string;
  type: string;
  media: string;
}

export interface IRidePriceSettings {
  freeOfChargeHoursByType: Record<string, number>;
  baseBillingHours: number;
  startHourThreshold: number;
  incrementPriceBy: string;
}

export interface IRideType {
  id: string;
  title: string;
}
