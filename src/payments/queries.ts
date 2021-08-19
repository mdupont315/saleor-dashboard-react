import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

export const getMyStore = gql`
  query {
    myStore {
      contantEnable
      contantCost
      stripeEnable
      stripeCost
      enableTransactionFee
    }
  }
`;

export const useGetMyStore = makeQuery<any, any>(getMyStore);
