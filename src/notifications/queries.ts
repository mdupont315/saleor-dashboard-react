import { getMyStore } from "@saleor/emergency/queries";
import makeQuery from "@saleor/hooks/makeQuery";

export const useGetMyStore = makeQuery<any, {}>(getMyStore);
