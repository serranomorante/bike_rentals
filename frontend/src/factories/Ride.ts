import { IRide } from "~src/@types/IRide";
import { BikeRide, SkateRide } from "~src/models/Ride";

export abstract class RideFactory<IData extends {}> {
  data: IData;
  resourceType: string;

  constructor(data: IData, resourceType: string) {
    this.data = data;
    this.resourceType = resourceType;
  }

  public abstract createRide(): IRide;

  public getInstance(): IRide {
    const ride = this.createRide();
    return ride;
  }

  public getDefaultBasePricePerHour(): string {
    const ride = this.createRide();
    return ride.basePrice;
  }
  public getDefaultIncludedHours(): number {
    return 1;
  }
  public getDefaultIncludedAccessories(): string[] {
    return [];
  }
}

export class BikeRideFactory<
  IData extends BikeRide
> extends RideFactory<IData> {
  public createRide(): IRide {
    return new BikeRide(
      this.data.slug,
      this.data.title,
      this.data.basePrice,
      this.data.type,
      this.data.media
    );
  }
}

export class SkateRideFactory<
  IData extends SkateRide
> extends RideFactory<IData> {
  public createRide(): IRide {
    return new SkateRide(
      this.data.slug,
      this.data.title,
      this.data.basePrice,
      this.data.type,
      this.data.media
    );
  }
}

export function createRideFactory(data: any, resourceType: string) {
  switch (resourceType) {
    case "bike":
      return new BikeRideFactory(data, resourceType);
    case "skate":
      return new SkateRideFactory(data, resourceType);
    default:
      throw Error("Not valid resource type.");
  }
}
