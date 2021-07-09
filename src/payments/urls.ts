import { stringifyQs } from "@saleor/utils/urls";

export const paymentSection = "/payments/";

export const paymentUrl = (params?: any) =>
  paymentSection + "?" + stringifyQs(params);
