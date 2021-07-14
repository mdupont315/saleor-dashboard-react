import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const emergency = gql`
  mutation DeliveryUpdate($id: ID!, $input: DeliveryUpdateInput!) {
    deliveryUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

export const useMutationEmergency = makeMutation<any, any>(emergency);
