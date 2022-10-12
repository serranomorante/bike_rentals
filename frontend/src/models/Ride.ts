import { IRide } from "~src/@types/IRide";

export class BikeRide implements IRide {
  slug: string;
  title: string;
  basePrice: string;
  type: string;
  media: string;

  constructor(
    slug: string,
    title: string,
    basePrice: string,
    type: string,
    media: string
  ) {
    this.slug = slug;
    this.title = title;
    this.basePrice = basePrice;
    this.type = type;
    this.media = media;
  }
}

export class SkateRide implements IRide {
  slug: string;
  title: string;
  basePrice: string;
  type: string;
  media: string;

  constructor(
    slug: string,
    title: string,
    basePrice: string,
    type: string,
    media: string
  ) {
    this.slug = slug;
    this.title = title;
    this.basePrice = basePrice;
    this.type = type;
    this.media = media;
  }
}
