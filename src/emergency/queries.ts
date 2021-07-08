import makeMutation from "@saleor/hooks/makeMutation";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const emergency = gql`
  mutation emergency($input: ShopSettingsInput!) {
    shopSettingsUpdate(input: $input) {
      shop {
        pickupStatus
        deliveryStatus
      }
      errors {
        field
        message
      }
    }
  }
`;

export const useMutationEmergency = makeMutation<any, any>(emergency);

const getMyStore = gql`
  query {
    myStore {
      id
      name
      domain
      deliveryStatus
      pickupStatus
    }
  }
`;

export const useGetMyStore = makeQuery<any, any>(getMyStore);
