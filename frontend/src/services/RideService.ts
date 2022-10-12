import axiosBase from "axios";
import { IRide, IRidePriceSettings, IRideType } from "~src/@types/IRide";
import axios from "~src/lib/axios";

export class RideService {
  public async getRidesListByType(
    locale: string,
    resourceType: string,
    type: string
  ) {
    try {
      const url = `/api/v1/rides?locale=${locale}&resourcetype=${resourceType}&type=${type}`;
      const response = await axios.get<IRide[]>(url);
      return response.data;
    } catch (error) {
      if (axiosBase.isAxiosError(error)) {
        throw error.response?.data;
      }

      throw error;
    }
  }

  public async getRideDetail(id: string, resourceType: string, locale: string) {
    try {
      const url = `/api/v1/rides/${id}?locale=${locale}&resourcetype=${resourceType}`;
      const response = await axios.get<IRide>(url);
      return response.data;
    } catch (error) {
      if (axiosBase.isAxiosError(error)) {
        throw error.response?.data;
      }

      throw error;
    }
  }

  public async getPriceSettings(locale: string) {
    try {
      const url = `api/v1/rides/price-settings?locale=${locale}`;
      const response = await axios.get<IRidePriceSettings>(url);
      return response.data;
    } catch (error) {
      if (axiosBase.isAxiosError(error)) {
        throw error.response?.data;
      }

      throw error;
    }
  }

  public async getRideTypes(locale: string) {
    try {
      const url = `api/v1/rides/types?locale=${locale}`;
      const response = await axios.get<IRideType[]>(url);
      return response.data;
    } catch (error) {
      if (axiosBase.isAxiosError(error)) {
        throw error.response?.data;
      }

      throw error;
    }
  }
}
