export interface ListStores {
  stores : ListStores_stores | null;
}
export interface ListStores_stores {
  edges: ListStores_stores_edges[];
  pageInfo: ListStores_stores_pageInfo;
}

export interface ListStores_stores_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListStores_stores_edges {
  __typename: "StoreCountableEdge ";
  node: ListStores_stores_edges_node;
}

export interface ListStores_stores_edges_node {
  __typename: "Store";
  id: string;
  name: string;
  dateJoined: Date,
  userName: string,
  address: string,
}

export interface ListStoresVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  // filter?: CustomerFilterInput | null;
  // sort?: UserSortingInput | null;
}
