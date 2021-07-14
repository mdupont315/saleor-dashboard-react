import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const getMyStore = gql`
  query {
    myStore {
      contantEnable
      contantCost
      stripeEnable
      stripeCost
    }
  }
`;

export const useGetMyStore = makeQuery<any, any>(getMyStore);
