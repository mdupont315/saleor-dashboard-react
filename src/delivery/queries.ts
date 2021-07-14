import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const getMyDelivery = gql`
  query GetMyDelivery {
    currentDelivery {
      id
      deliveryArea
      fromDelivery
      minOrder
      __typename
    }
  }
`;

export const useGetMyCurrentDelivery = makeQuery<any, any>(getMyDelivery);
