import { stringifyQs } from "@saleor/utils/urls";

export const secvicesSection = "/services-time/";

export const servicesUrl = (params?: any) =>
  secvicesSection + "?" + stringifyQs(params);
