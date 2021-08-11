import makeMutation from "@saleor/hooks/makeMutation";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const createServiceTime = gql`
  mutation CreateTime($input: ServiceTimeInput!) {
    serviceTimeCreate(input: $input) {
      serviceTime {
        dlDeliveryTime
        dlTimeGap
      }
      errors {
        message
      }
    }
  }
`;

export const useCreateServiceTime = makeMutation<any, any>(createServiceTime);

const upDateServiceTime = gql`
  mutation updateTime($input: ServiceTimeUpdateInput!, $id: ID!) {
    serviceTimeUpdate(input: $input, id: $id) {
      serviceTime {
        dlDeliveryTime
        dlTimeGap
      }
      errors {
        message
      }
    }
  }
`;
export const useUpdateServiceTime = makeMutation<any, any>(upDateServiceTime);

const getServiceTime = gql`
  query ListServiceTime($first: Int) {
    serviceTimes(first: $first) {
      edges {
        node {
          id
          dlDeliveryTime
          dlTimeGap
          dlAsSoonAsPosible
          dlAllowPreorder
          dlPreorderDay
          dlSameDayOrder
          dlServiceTime
          puDeliveryTime
          puTimeGap
          puAsSoonAsPosible
          puAllowPreorder
          puPreorderDay
          puSameDayOrder
          puServiceTime
          tableServiceTime
        }
      }
    }
  }
`;

export const useListServiceTime = makeQuery<any, any>(getServiceTime);
