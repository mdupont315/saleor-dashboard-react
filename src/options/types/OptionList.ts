/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: AttributeList
// ====================================================


export interface Option_attributes_edges_node {
    __typename: "Option";
    id: string;
    name: string | null;
    type: string | null;
    description:  string | null;
    require: boolean;
    }
  
  export interface OptionList_attributes_edges {
    __typename: "OptionCountableEdge";
    node: Option_attributes_edges_node;
  }
  
  export interface OptionList_attributes_pageInfo {
    __typename: "PageInfo";
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
  }
  
  export interface OptionList_attributes {
    __typename: "OptionCountableConnection";
    edges: OptionList_attributes_edges[];
    pageInfo: OptionList_attributes_pageInfo;
  }
  
  export interface OptionList {
    options(options: any): Option_attributes_edges_node[];
    attributes: OptionList_attributes | null;
  }
  
  export interface OptionListVariables {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }
  