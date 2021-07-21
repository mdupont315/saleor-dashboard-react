import {
  attributeDetailsFragment,
  attributeFragment,
  attributeValueListFragment
} from "@saleor/fragments/attributes";
import { saleFragment } from "@saleor/fragments/discounts";
import { optionsFragment } from "@saleor/fragments/options";
import { pageInfoFragment } from "@saleor/fragments/pageInfo";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  AttributeDetails,
  AttributeDetailsVariables
} from "./types/AttributeDetails";
import { AttributeList, AttributeListVariables } from "./types/AttributeList";
import { OptionList, OptionListVariables } from "./types/OptionList";
import { SaleList, SaleListVariables } from "./types/SaleList";

const attributeDetails = gql`
  ${attributeDetailsFragment}
  ${attributeValueListFragment}
  query AttributeDetails(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    attribute(id: $id) {
      ...AttributeDetailsFragment
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueListFragment
      }
    }
  }
`;

export const saleList = gql`
  ${pageInfoFragment}
  ${saleFragment}
  query SaleList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: SaleFilterInput
    $sort: SaleSortingInput
  ) {
    sales(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...SaleFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const useSaleListQuery = makeQuery<SaleList, SaleListVariables>(
  saleList
);

export const useAttributeDetailsQuery = makeQuery<
  AttributeDetails,
  AttributeDetailsVariables
>(attributeDetails);

const attributeList = gql`
  ${attributeFragment}
  ${pageInfoFragment}
  query AttributeList(
    $filter: AttributeFilterInput
    $before: String
    $after: String
    $first: Int
    $last: Int
    $sort: AttributeSortingInput
  ) {
    attributes(
      filter: $filter
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
    ) {
      edges {
        node {
          ...AttributeFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export const useAttributeListQuery = makeQuery<
  AttributeList,
  AttributeListVariables
>(attributeList);

// queries option
export const optionList = gql`
  ${optionsFragment}
  ${pageInfoFragment}
  query OptionList($before: String, $after: String, $first: Int, $last: Int) {
    options(before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          ...OptionsFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export const useOptionListQuery = makeQuery<OptionList, OptionListVariables>(
  optionList
);

const optionDetails = gql`
  query OptionDetails($id: ID!) {
    option(id: $id) {
      name
      required
      type
      optionValues {
        id
        name
        channelListing {
          id
          price {
            currency
            amount
          }
          channel {
            id
            name
            isActive
            slug
            currencyCode
            hasOrders
          }
        }
      }
    }
  }
`;

export const useOptionDetailsQuery = makeQuery<any, {}>(optionDetails);
