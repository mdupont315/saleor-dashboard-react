import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const getMyDelivery = gql`
  query GetMyDelivery {
    currentDelivery {
      id
      deliveryArea
      deliveryFee
      fromDelivery
      minOrder
      enableForBigOrder
      enableCustomDeliveryFee
      __typename
    }
  }
`;

export const useGetMyCurrentDelivery = makeQuery<any, any>(getMyDelivery);
