import { IRide, IRidePriceSettings } from "./IRide";

export interface IModifier {
  ride: IRide;
  getBasePriceModifierValue(): string;
  getBillingHoursModifierValue(): number;
}

export interface IModifierData extends IRidePriceSettings {
  ride: IRide;
  selectedStartHour: number;
  selectedHours: number;
}
