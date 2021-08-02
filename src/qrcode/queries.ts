import makeQuery from "@saleor/hooks/makeQuery";
import { TypedMutation } from "@saleor/mutations";
import gql from "graphql-tag";

export const getListTable = gql`
  query GetTableList($first: Int) {
    tableServices(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }

      edges {
        node {
          id
          tableName
          tableQrCode
        }
      }
    }
  }
`;
export const useTableListQuery = makeQuery<any, any>(getListTable);

export const getTableDetail = gql`
  query GetTableDetail($id: ID) {
    tableService(id: $id) {
      id
      tableName
      tableQrCode
    }
  }
`;

export const useGetTableDetail = makeQuery<any, any>(getTableDetail);

export const createTableMutation = gql`
  mutation CreateTable($input: TableServiceInput!) {
    tableServiceCreate(input: $input) {
      errors {
        field
        message
      }
      tableService {
        id
        tableName
        tableQrCode
      }
    }
  }
`;

export const updateTableMutation = gql`
  mutation UpdateTable($id: ID!, $input: TableServiceInput!) {
    tableServiceUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      tableService {
        id
        tableName
        tableQrCode
      }
    }
  }
`;

export const deleteBulkTableMutation = gql`
  mutation DeleteBulkTable($ids: [ID]!) {
    tableServiceBulkDelete(ids: $ids) {
      count
      errors {
        field
        message
      }
    }
  }
`;

export const TypedBulkRemoveTables = TypedMutation<any, {}>(
  deleteBulkTableMutation
);
