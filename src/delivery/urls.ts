import { stringifyQs } from "@saleor/utils/urls";

export const deliverySection = "/delivery/";

export const deliveryUrl = (params?: any) =>
  deliverySection + "?" + stringifyQs(params);
