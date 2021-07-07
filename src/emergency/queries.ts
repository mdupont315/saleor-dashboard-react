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

const getServiceTime = gql`
  query ListServiceTime($first: Int) {
    serviceTimes(first: $first) {
      edges {
        node {
          id
          dlDeliveryTime
          dlTimeGap
          dlAsSoonAsPosible
          dlAllowPreorder
          dlPreorderDay
          dlSameDayOrder
          dlServiceTime
          puDeliveryTime
          puTimeGap
          puAsSoonAsPosible
          puAllowPreorder
          puPreorderDay
          puSameDayOrder
          puServiceTime
        }
      }
    }
  }
`;

export const useListServiceTime = makeQuery<any, any>(getServiceTime);
