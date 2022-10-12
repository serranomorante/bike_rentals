import { IModifier } from "~src/@types/IModifier";
import { IRide } from "~src/@types/IRide";

/**
 * These methods make changes on the properties
 * of a Ride (Bicycle, Skate, Scooter, Motorcycle, etc...)
 * based on the starting time of the rental (first half of the month,
 * last half of the month, etc...)
 */
export class StartingHourModifier implements IModifier {
  ride: IRide;
  selectedStartHour: number;
  startHourThreshold: number;
  incrementPriceBy: string;

  constructor(
    ride: IRide,
    selectedStartHour: number,
    startHourThreshold: number,
    incrementPriceBy: string
  ) {
    this.ride = ride;
    this.selectedStartHour = selectedStartHour;
    this.startHourThreshold = startHourThreshold;
    this.incrementPriceBy = incrementPriceBy;
  }

  /**
   * The hours that we bill our clients for usage of our equipment
   * doesn't vary by the starting time of rental.
   * @returns
   */
  getBillingHoursModifierValue(): number {
    return 0;
  }

  /**
   * The `basePrice` of the ride can vary depending on the
   * starting time of the rental.
   * @returns The new `basePrice`.
   */
  getBasePriceModifierValue(): string {
    if (this.selectedStartHour >= this.startHourThreshold) {
      return this.incrementPriceBy;
    }

    return "0.00";
  }
}

/**
 * These methods make changes on the properties
 * of a Ride (Bicycle, Skate, Scooter, Motorcycle, etc...)
 * based on the type of the ride (Electric Bike, Regular Bike, etc...).
 */
export class RideTypeModifier implements IModifier {
  ride: IRide;
  freeOfChargeHoursByType: Record<string, number>;
  selectedHours: number;
  baseBillingHours: number;

  constructor(
    ride: IRide,
    freeOfChargeHoursByType: Record<string, number>,
    selectedHours: number,
    baseBillingHours: number
  ) {
    this.ride = ride;
    this.freeOfChargeHoursByType = freeOfChargeHoursByType;
    this.selectedHours = selectedHours;
    this.baseBillingHours = baseBillingHours;
  }

  /**
   * The `basePrice` of the ride is not affected by variables
   * like the type of the ride.
   * That's why here we return an unmodified `basePrice`.
   * @returns
   */
  getBasePriceModifierValue(): string {
    return "0.00";
  }

  /**
   * The client is charged by the hours (or days) of usage
   * of our ride equipment. These billed hours can vary
   * depending on the type of equipment being rented.
   * @returns
   */
  getBillingHoursModifierValue(): number {
    if (this.selectedHours === this.baseBillingHours) {
      return 0;
    }
    const freeOfChargeHours = this.freeOfChargeHoursByType[this.ride.type];
    const newBillingHours = this.selectedHours - freeOfChargeHours;
    if (newBillingHours < this.baseBillingHours) {
      const newFreeOfCharge = this.baseBillingHours - freeOfChargeHours;
      return -Math.abs(newFreeOfCharge);
    }
    return -Math.abs(freeOfChargeHours);
  }
}
