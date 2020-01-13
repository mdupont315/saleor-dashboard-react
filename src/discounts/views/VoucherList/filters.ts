import {
  VoucherFilterInput,
  DiscountStatusEnum,
  VoucherDiscountType
} from "@saleor/types/globalTypes";
import { maybe, findValueInEnum, joinDateTime } from "@saleor/misc";
import { IFilterElement } from "@saleor/components/Filter";
import {
  VoucherListFilterOpts,
  VoucherFilterKeys
} from "@saleor/discounts/components/VoucherListPage";
import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables
} from "../../../utils/filters";
import {
  VoucherListUrlFilters,
  VoucherListUrlFiltersEnum,
  VoucherListUrlQueryParams
} from "../../urls";

export const VOUCHER_FILTERS_KEY = "voucherFilters";

export function getFilterOpts(
  params: VoucherListUrlFilters
): VoucherListFilterOpts {
  return {
    saleType: {
      active: !!maybe(() => params.type),
      value: maybe(
        () =>
          dedupeFilter(
            params.type.map(type => findValueInEnum(type, VoucherDiscountType))
          ),
        []
      )
    },
    started: {
      active: maybe(
        () =>
          [params.startedFrom, params.startedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.startedTo, ""),
        min: maybe(() => params.startedFrom, "")
      }
    },
    status: {
      active: !!maybe(() => params.status),
      value: maybe(
        () =>
          dedupeFilter(
            params.status.map(status =>
              findValueInEnum(status, DiscountStatusEnum)
            )
          ),
        []
      )
    },
    timesUsed: {
      active: maybe(
        () =>
          [params.timesUsedFrom, params.timesUsedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.timesUsedTo, ""),
        min: maybe(() => params.timesUsedFrom, "")
      }
    }
  };
}

export function getFilterVariables(
  params: VoucherListUrlFilters
): VoucherFilterInput {
  return {
    discountType:
      params.type &&
      params.type.map(type => findValueInEnum(type, VoucherDiscountType)),
    search: params.query,
    started: getGteLteVariables({
      gte: joinDateTime(params.startedFrom),
      lte: joinDateTime(params.startedTo)
    }),
    status:
      params.status &&
      params.status.map(status => findValueInEnum(status, DiscountStatusEnum)),
    timesUsed: getGteLteVariables({
      gte: parseInt(params.timesUsedFrom, 0),
      lte: parseInt(params.timesUsedTo, 0)
    })
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<VoucherFilterKeys>
): VoucherListUrlFilters {
  const { active, multiple, name, value } = filter;

  switch (name) {
    case VoucherFilterKeys.saleType:
      if (!active) {
        return {
          type: undefined
        };
      }

      return {
        type: value.map(type => findValueInEnum(type, VoucherDiscountType))
      };

    case VoucherFilterKeys.started:
      if (!active) {
        return {
          startedFrom: undefined,
          startedTo: undefined
        };
      }
      if (multiple) {
        return {
          startedFrom: value[0],
          startedTo: value[1]
        };
      }

      return {
        startedFrom: value[0],
        startedTo: value[0]
      };

    case VoucherFilterKeys.timesUsed:
      if (!active) {
        return {
          timesUsedFrom: undefined,
          timesUsedTo: undefined
        };
      }
      if (multiple) {
        return {
          timesUsedFrom: value[0],
          timesUsedTo: value[1]
        };
      }

      return {
        timesUsedFrom: value[0],
        timesUsedTo: value[0]
      };

    case VoucherFilterKeys.status:
      if (!active) {
        return {
          status: undefined
        };
      }
      return {
        status: value.map(val => findValueInEnum(val, DiscountStatusEnum))
      };
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<VoucherListUrlFilters>(VOUCHER_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  VoucherListUrlQueryParams,
  VoucherListUrlFilters
>(VoucherListUrlFiltersEnum);
