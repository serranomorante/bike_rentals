import { IModifier } from "~src/@types/IModifier";
import { RideTypeModifier, StartingHourModifier } from "~src/models/Modifier";

export abstract class ModifierFactory<IData extends {}> {
  data: IData;
  actionType: string;

  constructor(data: IData, actionType: string) {
    this.data = data;
    this.actionType = actionType;
  }

  public abstract createModifier(): IModifier;

  public getBasePriceModifierValue(): string {
    const modifier = this.createModifier();
    const newBasePrice = modifier.getBasePriceModifierValue();
    return newBasePrice;
  }

  /**
   * Return the real hours for which you
   * are going to charge your user.
   */
  public getBillingHoursModifierValue(): number {
    const modifier = this.createModifier();
    const realBillingHours = modifier.getBillingHoursModifierValue();
    return realBillingHours;
  }
}

export class StartingHourModifierFactory<
  IData extends StartingHourModifier
> extends ModifierFactory<IData> {
  public createModifier(): IModifier {
    return new StartingHourModifier(
      this.data.ride,
      this.data.selectedStartHour,
      this.data.startHourThreshold,
      this.data.incrementPriceBy
    );
  }
}

export class RideTypeModifierFactory<
  IData extends RideTypeModifier
> extends ModifierFactory<IData> {
  public createModifier(): IModifier {
    return new RideTypeModifier(
      this.data.ride,
      this.data.freeOfChargeHoursByType,
      this.data.selectedHours,
      this.data.baseBillingHours
    );
  }
}

/**
 * Here you might be selecting an starting date
 * or selecting an end date.
 * @param actionType
 */
export function createModifierFactory(data: any, actionType: string) {
  switch (actionType) {
    case "startingHour":
      return new StartingHourModifierFactory(data, actionType);
    case "rideType":
      return new RideTypeModifierFactory(data, actionType);
    default:
      throw Error("No valid action type.");
  }
}
