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

export const getMyStore = gql`
  query {
    myStore {
      id
      name
      domain
      address
      phone
      deliveryStatus
      pickupStatus
      tableServiceStatus
      enableTransactionFee
      stripeEnable
      stripeCost
      contantEnable
      contantCost
      indexCash
      indexStripe
      postalCode
      city
      logo {
        url
        alt
      }
      coverPhoto {
        url
        alt
      }
      emailNotifications
      emailAddress
      posEnable
      # payments{
      #   id
      #   gateway
      # }
    }
  }
`;

export const useGetMyStore = makeQuery<any, any>(getMyStore);
