import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import {
  ActiveTab,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog
} from "../types";

export const pluginSection = "/plugins/";

export const pluginListPath = pluginSection;
export const STRIPE_PLUGIN_ID = "mirumee.payments.stripe";
export enum PluginListUrlFiltersEnum {
  query = "query",
  active = "active",
  channels = "channels",
  type = "type"
}

export type PluginListUrlFilters = Filters<PluginListUrlFiltersEnum> & {
  channels?: string[];
};
export type PluginListUrlDialog = TabActionDialog;
export enum PluginListUrlSortField {
  name = "name",
  active = "active"
}
export type PluginListUrlSort = Sort<PluginListUrlSortField>;
export type PluginListUrlQueryParams = ActiveTab &
  Dialog<PluginListUrlDialog> &
  PluginListUrlFilters &
  Pagination &
  PluginListUrlSort &
  SingleAction;
export const pluginListUrl = (params?: PluginListUrlQueryParams) =>
  pluginListPath + "?" + stringifyQs(params);

export const pluginPath = (id: string) => urlJoin(pluginSection, id);
export type PluginUrlDialog = "clear" | "edit";
export type PluginUrlQueryParams = Dialog<PluginUrlDialog> & SingleAction;
export const pluginUrl = (id: string, params?: PluginUrlQueryParams) =>
  pluginPath(encodeURIComponent(id)) + "/?" + stringifyQs(params);
export const stripePluginUrl = (params?: PluginUrlQueryParams) =>
  pluginPath(encodeURIComponent(STRIPE_PLUGIN_ID)) + "/?" + stringifyQs(params);
