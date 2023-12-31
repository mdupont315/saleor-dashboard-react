import { IFilterElement } from "@saleor/components/Filter";
import {
  CustomerFilterKeys,
  CustomerListFilterOpts
} from "@saleor/customers/components/CustomerListPage";
import { maybe } from "@saleor/misc";
import { CustomerFilterInput } from "@saleor/types/globalTypes";

import {
  createFilterTabUtils,
  createFilterUtils,
  getMinMaxQueryParam
} from "../../../utils/filters";
import {
  StoreListUrlFilters,
  StoreListUrlFiltersEnum,
  StoreListUrlQueryParams
} from "../../urls";

export const CUSTOMER_FILTERS_KEY = "customerFilters";

export function getFilterOpts(
  params: StoreListUrlFilters
): CustomerListFilterOpts {
  return {
    joined: {
      active: maybe(
        () =>
          [params.joinedFrom, params.joinedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.joinedTo, ""),
        min: maybe(() => params.joinedFrom, "")
      }
    },
    numberOfOrders: {
      active: maybe(
        () =>
          [params.numberOfOrdersFrom, params.numberOfOrdersTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.numberOfOrdersTo, ""),
        min: maybe(() => params.numberOfOrdersFrom, "")
      }
    }
  };
}

export function getFilterVariables(params: any): CustomerFilterInput {
  return {
    // dateJoined: getGteLteVariables({
    //   gte: params.joinedFrom,
    //   lte: params.joinedTo
    // }),
    // numberOfOrders: getGteLteVariables({
    //   gte: parseInt(params.numberOfOrdersFrom, 0),
    //   lte: parseInt(params.numberOfOrdersTo, 0)
    // }),
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<CustomerFilterKeys>
): StoreListUrlFilters {
  const { name } = filter;

  switch (name) {
    case CustomerFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        StoreListUrlFiltersEnum.joinedFrom,
        StoreListUrlFiltersEnum.joinedTo
      );

    case CustomerFilterKeys.numberOfOrders:
      return getMinMaxQueryParam(
        filter,
        StoreListUrlFiltersEnum.numberOfOrdersFrom,
        StoreListUrlFiltersEnum.numberOfOrdersTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<StoreListUrlFilters>(CUSTOMER_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  StoreListUrlQueryParams,
  StoreListUrlFilters
>(StoreListUrlFiltersEnum);
