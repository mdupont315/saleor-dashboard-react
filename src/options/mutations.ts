import { attributeValueListFragment } from "@saleor/fragments/attributes";
import {
  attributeErrorFragment,
  optionErrorFlagment
} from "@saleor/fragments/errors";
import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

export const optionCreateMutation = gql`
  ${optionErrorFlagment}
  mutation CreateOption($input: OptionCreateInput!) {
    optionCreate(input: $input) {
      option {
        id
      }
      errors {
        ...OptionErrorFragment
      }
    }
  }
`;
export const useOptionCreateMutation = makeMutation<any, {}>(
  optionCreateMutation
);

const optionBulkDelete = gql`
  mutation OptionBulkDelete($ids: [ID]!) {
    optionBulkDelete(ids: $ids) {
      errors {
        code
        field
      }
    }
  }
`;
export const useOptionBulkDeleteMutation = makeMutation<any, {}>(
  optionBulkDelete
);

const optionDelete = gql`
  mutation OptionDelete($id: ID!) {
    optionDelete(id: $id) {
      errors {
        code
        field
      }
    }
  }
`;
export const useOptionDeleteMutation = makeMutation<any, {}>(optionDelete);

const optionDetail = gql`
  ${attributeErrorFragment}
  mutation OptionDelete($id: ID!) {
    optionDelete(id: $id) {
      errors {
        ...AttributeErrorFragment
      }
    }
  }
`;
export const useOptionDetailMutation = makeMutation<any, {}>(optionDetail);

export const optionValueCreateMutation = gql`
  ${attributeValueListFragment}
  ${attributeErrorFragment}
  mutation AttributeValueCreate(
    $id: ID!
    $input: AttributeValueCreateInput!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    attributeValueCreate(attribute: $id, input: $input) {
      attribute {
        id
        choices(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...AttributeValueListFragment
        }
      }
      errors {
        ...AttributeErrorFragment
      }
    }
  }
`;
export const useOptionValueCreateMutation = makeMutation<any, {}>(
  optionValueCreateMutation
);

const optionValueUpdateMutation = gql`
  mutation UpdateValueOption($id: ID!, $input: UpdateOptionValueInput!) {
    optionValueUpdate(id: $id, input: $input) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export const useOptionValueUpdateMutation = makeMutation<any, {}>(
  optionValueUpdateMutation
);

const optionUpdateMutation = gql`
  mutation optionValueUpdate($id: ID!, $input: OptionUpdateInput!) {
    optionUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
    }
  }
`;
export const useOptionUpdateMutation = makeMutation<any, {}>(
  optionUpdateMutation
);
