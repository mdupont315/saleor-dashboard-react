import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const storeUpdateMutation = gql`
  mutation MyStoreUpdate($input: StoreUpdateInput!) {
    myStoreUpdate(input: $input) {
      store {
        id
        name
        domain
        indexCash
        indexStripe
      }
      errors {
        message
        field
      }
    }
  }
`;

// update store
export const useUpdateStoreMutation = makeMutation<any, {}>(
  storeUpdateMutation
);
//
