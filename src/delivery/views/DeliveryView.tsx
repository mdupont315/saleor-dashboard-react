import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import DeliveryViewPage from "../components/DeliveryViewPage";
import { useMutationEmergency } from "../mutation";
import { useGetMyCurrentDelivery } from "../queries";

function DeliveryView() {
  const intl = useIntl();
  const notify = useNotifier();
  const { data } = useGetMyCurrentDelivery({});

  // console.log(data);

  const [updateEmergency, updateEmergencyOpts] = useMutationEmergency({
    onCompleted: data => {
      if (data.storeUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
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

  const onSubmit = (input: any) => {
    // console.log(input);
    // const variables = {
    //   id: "U3RvcmU6MQ=="
    // };
    // updateEmergency({
    //   variables
    // });
  };

  return (
    <>
      <DeliveryViewPage
        onSubmit={onSubmit}
        updateEmergencyOpts={updateEmergencyOpts}
      />
    </>
  );
}

export default DeliveryView;
