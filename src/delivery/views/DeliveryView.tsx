import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

import DeliveryViewPage from "../components/DeliveryViewPage";
import { useMutationEmergency } from "../mutation";
import { useGetMyCurrentDelivery } from "../queries";

function DeliveryView() {
  const intl = useIntl();
  const notify = useNotifier();
  const { data, refetch } = useGetMyCurrentDelivery({});

  const [updateEmergency, updateEmergencyOpts] = useMutationEmergency({
    onCompleted: data => {
      if (data.deliveryUpdate.errors.length === 0) {
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

  const onSubmit = async input => {
    const generatorInput = {
      deliveryFee: input.deliveryFee,
      minOrder: input.minOrder,
      fromDelivery: input.fromDelivery,
      deliveryArea: JSON.stringify({ areas: input.deliveryArea })
    };
    const result = await updateEmergency({
      variables: {
        id: input.id,
        input: generatorInput
      }
    });
    return result;
  };

  return (
    <>
      <DeliveryViewPage
        data={maybe(() => data.currentDelivery)}
        onSubmit={onSubmit}
        updateEmergencyOpts={updateEmergencyOpts}
      />
    </>
  );
}

export default DeliveryView;
