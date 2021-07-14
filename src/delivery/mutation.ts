import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const emergency = gql`
  mutation emergency($id: ID!, $input: DeliveryUpdate!) {
    deliveryUpdate(id: $id, input: $input) {
      delivery {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;

export const useMutationEmergency = makeMutation<any, any>(emergency);
