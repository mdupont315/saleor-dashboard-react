import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

import NotifactionViewPage from "../components/Notification";
import { useUpdateStoreMutation } from "../mutation";
import { useGetMyStore } from "../queries";

function NotificationView() {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();

  const { data, refetch } = useGetMyStore({ variables: {} });

  const [updateEmergency, updateEmergencyOpts] = useUpdateStoreMutation({
    onCompleted: data => {
      if (data.myStoreUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
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

  const onBack = () => {
    navigate("/configuration");
  };

  const onSubmit = async input => {
    const result = await updateEmergency({
      variables: {
        input
      }
    });
    return result;
  };

  return (
    <>
      {data && data.myStore !== undefined ? (
        <NotifactionViewPage
          onSubmit={onSubmit}
          onBack={onBack}
          data={maybe(() => data.myStore)}
          state={updateEmergencyOpts.status}
          disable={updateEmergencyOpts.loading}
        />
      ) : (
        <>
          <></>
        </>
      )}
    </>
  );
}

export default NotificationView;
