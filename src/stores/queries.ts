import makeMutation from "@saleor/hooks/makeMutation";
import makeQuery from "@saleor/hooks/makeQuery";
import { TypedMutation } from "@saleor/mutations";
import gql from "graphql-tag";

export const storesList = gql`
  query ListStores(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: StoreFilterInput # $channel: String
  ) {
    stores(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter #   channel: $channel
    ) {
      edges {
        node {
          id
          name
          domain
          logo {
            url
            alt
          }
          coverPhoto {
            url
            alt
          }
        }
      }
    }
  }
`;

// export const UpdateStore = gql``;
const storeUpdateMutation = gql`
  mutation storeUpdate($input: StoreUpdateInput!, $id: ID!) {
    storeUpdate(id: $id, input: $input) {
      store {
        id
        name
        domain
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

export const updateUser = gql`
  mutation updateUser($input: AccountInput!) {
    accountUpdate(input: $input) {
      user {
        email
        id
      }
    }
  }
`;

export const useUpdateUser = makeMutation<any, any>(updateUser);

export const storeRegisterMutation = gql`
  mutation createstore($input: StoreInput!) {
    storeCreate(input: $input) {
      store {
        id
        name
        domain
      }
      errors {
        message
      }
    }
  }
`;

export const useCreateStoreMutation = makeMutation<any, any>(
  storeRegisterMutation
);

export const AddStoreMutation = TypedMutation<any, any>(storeRegisterMutation);

export const useStoreListQuery = makeQuery<any, any>(storesList);

export const storeForUser = gql`
  query stores($id: ID!) {
    store(id: $id) {
      id
      name
      domain
      phone
      address
      city
      postalCode
      logo {
        url
        alt
      }
      coverPhoto {
        url
        alt
      }
      favicon {
        url
        alt
      }
      address
      phone
      description
    }
  }
`;

export interface IStoreForUser {
  store: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    id: string;
    name: string;
    userName?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    streetAddress1?: string;
    streetAddress2?: string;
    description?: string;
    storeType: {
      id: string;
      name: string;
    };
    phone?: string;
    acreage?: number;
    latlong?: string;

    backgroundImage?: string;
    backgroundImageAlt?: string;
  };
}

export const useStoreById = makeQuery<any, {}>(storeForUser);

export const storeTypeQuery = gql`
  query stores {
    storeTypes(first: 10) {
      edges {
        node {
          id
          name
          address
          phone
        }
      }
    }
  }
`;

export const useListStoreTypeQuery = makeQuery<IStoreType, {}>(storeTypeQuery);

export const deleteStoreMutation = gql`
  mutation deleteStore($id: ID!) {
    storeDelete(id: $id) {
      storeErrors {
        message
      }
      store {
        id
      }
    }
  }
`;

export const useDeleteStore = makeMutation<any, {}>(deleteStoreMutation);

export const userStoreGet = gql`
  query userStoreGet($id: ID!) {
    userStore(storeId: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const useUserStoreGet = makeQuery<any, {}>(userStoreGet);

export const uploadMediaStore = gql`
  mutation storeMedia($id: ID!, $input: StoreMediaInput!) {
    storeMediaUpdate(id: $id, input: $input) {
      storeErrors {
        field
      }
      store {
        name
      }
    }
  }
`;

export const useStoreUploadMedia = makeMutation<any, {}>(uploadMediaStore);

export interface IStoreType {
  storeTypes: StoreType | null;
}

export interface StoreType {
  __typename: "StoreTypeCountableConnection";
  edges: StoreTypeList_edges[];
}

export interface StoreTypeList_edges {
  __typename: "CategoryCountableEdge";
  node: StoreType_edges_node;
}

export interface StoreType_edges_node {
  __typename: "StoreType";
  id: string;
  name: string;
}

export interface UpdateStore_storeUpdate {
  __typename: "StoreUpdate";
  /**
   * List of errors that occurred executing the mutation.
   */
  storeErrors: UpdateStore_storeUpdate_errors[];
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
  store: StoreResponse;
}

export interface StoreResponse {
  backgroundImage: { alt: string; __typename: "Image" };
  description: string;
  id: string;
  latlong: string;
  name: string;
  phone: string;
  __typename: "Store";
}

export interface UpdateStore {
  /**
   * Register a new user.
   */
  storeUpdate: UpdateStore_storeUpdate | null;
}

export interface UpdateStore_storeUpdate_errors {
  __typename: "StoreError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateStoreVariables {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  name: string;
  id: string;
  description?: string;
  storeTypeId: string;
  country?: string;
  city?: string;
  postalCode?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  phone?: string;
  acreage?: number;
  latlong?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export interface RegisterStoreVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name: string;
  description?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  storeTypeId: string;
  phone?: string;
  acreage?: number;
  latlong?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export interface RegisterStore {
  storeCreate: RegisterStore_storeRegister | null;
}

export interface RegisterStore_storeRegister {
  __typename: "StoreCreate";
  storeErrors: RegisterStore_storeRegister_errors[];
  store: StoreResponse;
}

export interface RegisterStore_storeRegister_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}
