import { stringifyQs } from "@saleor/utils/urls";

export const notificationSection = "/notifications/";

export const notificationUrl = (params?: any) =>
  notificationSection + "?" + stringifyQs(params);
