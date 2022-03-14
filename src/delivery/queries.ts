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
<<<<<<< HEAD
      enableMinimumDeliveryOrderValue
=======
>>>>>>> af93bd3656bd1baa62bbb20c30cc3f4185fb6c0c
      __typename
    }
  }
`;

export const useGetMyCurrentDelivery = makeQuery<any, any>(getMyDelivery);
