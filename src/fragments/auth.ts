import gql from "graphql-tag";

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    isSupplier
    userPermissions {
      code
      name
    }
    avatar {
      url
    }
  }
`;
