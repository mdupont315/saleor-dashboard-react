import { stringifyQs } from "@saleor/utils/urls";

export const emergencySection = "/emergency/";

export const emergencyUrl = (params?: any) =>
  emergencySection + "?" + stringifyQs(params);
