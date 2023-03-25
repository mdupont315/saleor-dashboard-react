import gql from "graphql-tag";

// import { metadataFragment } from "./metadata";
// import { pageInfoFragment } from "./pageInfo";

export const optionsFragment = gql`
  fragment OptionsFragment on Option {
    id
    name
    type
    description
    required
  }
`;
/*
export const optionValueFragment = gql`
  fragment OptionValueFragment on OptionValue {
    name
    type
    required
    optionValues: [
      
    ]
  }
`;
*/
