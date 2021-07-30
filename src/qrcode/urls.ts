import {
  ActiveTab,
  BulkAction,
  Dialog,
  Pagination,
  Sort,
  TabActionDialog
} from "@saleor/types";
import { stringifyQs } from "@saleor/utils/urls";
import urlJoin from "url-join";

export const qrSection = "/qrcode/";
export const qrListPath = qrSection;
export enum TableListUrlSortField {
  name = "name"
}
export const qrPath = (id: string) => urlJoin(qrSection, id);

export type QRListUrlDialog = "remove" | TabActionDialog;
export type TableListUrlSort = Sort<TableListUrlSortField>;
export type QRUrlDialog = "remove";

export type QRListUrlQueryParams = ActiveTab &
  BulkAction &
  // CustomerListUrlFilters &
  TableListUrlSort &
  Dialog<QRListUrlDialog> &
  Pagination;
export type QRUrlQueryParams = Dialog<QRUrlDialog>;
export const qrListUrl = (params?: any) =>
  qrListPath + "?" + stringifyQs(params);
export const tableUrl = (id: string, params?: QRUrlQueryParams) =>
  qrPath(encodeURIComponent(id)) + "?" + stringifyQs(params);
export const qrAddPath = urlJoin(qrSection, "add");
