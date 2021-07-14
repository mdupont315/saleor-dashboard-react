import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const getMyStore = gql`
  query GetMyStore {
    myStore {
      emailNotifications
      emailAddress
    }
  }
`;

export const useGetMyStore = makeQuery<any, any>(getMyStore);
