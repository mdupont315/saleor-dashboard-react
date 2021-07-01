import { StoreListUrlSortField } from "@saleor/stores/urls";
import { StoreSortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(sort: StoreListUrlSortField): StoreSortField {
  switch (sort) {
    case StoreListUrlSortField.name:
      return StoreSortField.NAME;

    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
