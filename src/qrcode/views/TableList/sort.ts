import { TableListUrlSortField } from "@saleor/qrcode/urls";
import { TableSortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(sort: TableListUrlSortField): TableSortField {
  switch (sort) {
    case TableListUrlSortField.name:
      return TableSortField.NAME;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
