import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
// import { maybe } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

import StoreDetailPage from "../components/StoreDetailPage/StoreDetailPage";
import {
  useCreateStoreMutation,
  useStoreById,
  useUpdateStoreMutation,
  useUserStoreGet
} from "../queries";
import {
  storePath,
  storesManagementSection,
  StoreUrlQueryParams
} from "../urls";

interface IProps {
  id: string;
  params: StoreUrlQueryParams;
}

const StoreDetailsViewComponent: React.FC<IProps> = ({ id }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  if (id !== "undefined") {
    const { data, loading, refetch } = useStoreById({
      displayLoader: true,
      variables: { id }
    });

    const { data: userData } = useUserStoreGet({
      displayLoader: true,
      variables: { id }
    });

    const [updateStore] = useUpdateStoreMutation({
      onCompleted: data => {
        if (data.storeUpdate.errors.length === 0) {
          notify({
            status: "success",
            text: intl.formatMessage(commonMessages.savedChanges)
          });
          navigate(storePath(id));
        } else {
          notify({
            status: "error",
            text: intl.formatMessage({
              defaultMessage: "Update Fail! Please Try Again!"
            })
          });
        }
      }
    });

    const handleSubmit = (data: Partial<any>) => {
      const variables: any = {
        id,
        input: {
          name: data.name,
          domain: data.domain,
          phone: data.phone,
          address: data.address,
          logo: data.logo[0].image,
          coverPhoto: data.coverPhoto[0].image
        }
      };
      updateStore({
        variables
      });
    };

    return (
      <>
        {data && (
          <>
            <WindowTitle title="Store detail" />
            <StoreDetailPage
              disabled={loading}
              storeId={id}
              initialValues={data}
              userData={userData}
              onBack={() => navigate(storePath(id))}
              handleRefetch={refetch}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </>
    );
  } else {
    const [createStore] = useCreateStoreMutation({
      onCompleted: data => {
        if (data.storeCreate.errors.length === 0) {
          notify({
            status: "success",
            text: intl.formatMessage(commonMessages.savedChanges)
          });
          navigate(storesManagementSection);
        } else {
          notify({
            status: "error",
            text: intl.formatMessage({
              defaultMessage: "Create Fail! Please Try Again!"
            })
          });
        }
      }
    });

    const handleSubmit = (data: Partial<any>) => {
      const variables: any = {
        input: {
          name: data.name,
          domain: data.domain,
          email: data.email,
          password: data.password
        }
      };

      createStore({
        variables
      });
    };

    return (
      <>
        <WindowTitle title="Store detail" />
        <StoreDetailPage
          onBack={() => navigate(storesManagementSection)}
          onSubmit={handleSubmit}
        />
      </>
    );
  }
};

export default StoreDetailsViewComponent;
