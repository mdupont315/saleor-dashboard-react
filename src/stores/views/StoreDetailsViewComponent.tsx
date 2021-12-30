import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
// import { maybe } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

import { useAuth } from "../../auth/AuthProvider";
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
  storeUrl,
  StoreUrlDialog,
  StoreUrlQueryParams
} from "../urls";
import StoreDetailSubDomainFields from "./StoreDetailSubDomainField";

interface IProps {
  id: string;
  params: StoreUrlQueryParams;
}

const StoreDetailsViewComponent: React.FC<IProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const { user } = useAuth();

  const [openModal, closeModal] = createDialogActionHandlers<
    StoreUrlDialog,
    StoreUrlQueryParams
  >(navigate, params => storeUrl(id, params), params);

  const onBack = () => {
    navigate(user.isSuperuser === true ? "/" : "/configuration");
  };

  if (id !== "undefined") {
    const { data, refetch } = useStoreById({
      displayLoader: true,
      variables: { id }
    });

    const { data: userData } = useUserStoreGet({
      displayLoader: true,
      variables: { id }
    });

    const [updateStore, updateStoreOpts] = useUpdateStoreMutation({
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
          address: data.address,
          phone: data.phone,
          logo: data.logo[0].image,
          favicon: data.favicon[0].image,
          coverPhoto: data.coverPhoto[0].image,
          city: data.city,
          postalCode: data.postalcode
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
            <WindowTitle title="Site setting" />
            <StoreDetailPage
              params={params}
              disabled={updateStoreOpts.loading}
              storeId={id}
              initialValues={data}
              userData={userData}
              saveButtonBarState={updateStoreOpts.status}
              onBack={onBack}
              handleRefetch={refetch}
              onSubmit={handleSubmit}
              openModal={openModal}
              closeModal={closeModal}
            />
            <StoreDetailSubDomainFields
              id={id}
              onClose={closeModal}
              action={params.action}
            />
          </>
        )}
      </>
    );
  } else {
    const [createStore, createStoreOpts] = useCreateStoreMutation({
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
        <WindowTitle title="Site setting" />
        <StoreDetailPage
          onBack={onBack}
          onSubmit={handleSubmit}
          saveButtonBarState={createStoreOpts.status}
          disabled={createStoreOpts.loading}
          openModal={openModal}
          closeModal={closeModal}
        />
      </>
    );
  }
};

export default StoreDetailsViewComponent;
