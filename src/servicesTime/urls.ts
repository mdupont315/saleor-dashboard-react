import { stringifyQs } from "@saleor/utils/urls";

export const secvicesSection = "/secvices-time/";

export const servicesUrl = (params?: any) =>
  secvicesSection + "?" + stringifyQs(params);
