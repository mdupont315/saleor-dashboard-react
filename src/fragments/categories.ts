import gql from "graphql-tag";

import { metadataFragment } from "./metadata";

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    enable
    children {
      totalCount
    }
    products {
      totalCount
    }
  }
`;
export const categoryDetailsFragment = gql`
  ${metadataFragment}
  fragment CategoryDetailsFragment on Category {
    id
    ...MetadataFragment
    backgroundImage {
      alt
      url
    }
    name
    slug
    description
    seoDescription
    seoTitle
    enable
    parent {
      id
    }
  }
`;
