import { Container } from "@material-ui/core";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, sectionNames } from "@saleor/intl";
import { useUpdateStoreMutation } from "@saleor/stores/queries";
import React from "react";
import { useIntl } from "react-intl";

import { useGetMyStore } from "../queries";
import EmergencyCard from "./EmergencyCard";

function EmergencyViewPage() {
  const intl = useIntl();
  const [emergency, setEmergency] = React.useState({
    e_pickup: new Date().getDate(),
    e_delivery: new Date().getDate()
  });

  const notify = useNotifier();

  const [updateEmergency, updateEmergencyOpts] = useUpdateStoreMutation({
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

  const handleClick = () => {
    const temp = new Date();
    const variables = {
      id: data.myStore.id,
      input: {
        pickupStatus: new Date(temp.setDate(emergency.e_pickup)),
        deliveryStatus: new Date(temp.setDate(emergency.e_delivery))
      }
    };

    updateEmergency({
      variables
    });
  };

  const { data } = useGetMyStore({ variables: {} });

  React.useEffect(() => {
    if (typeof data !== "undefined") {
      setEmergency({
        ...emergency,
        e_pickup: new Date(data.myStore.pickupStatus).getDate(),
        e_delivery: new Date(data.myStore.deliveryStatus).getDate()
      });
    }
  }, [data]);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.emergency)} />
      <EmergencyCard emergency={emergency} setEmergency={setEmergency} />
      <SaveButtonBar
        disabled={updateEmergencyOpts.loading}
        state={updateEmergencyOpts.status}
        onSave={handleClick}
      />
    </Container>
  );
}

export default EmergencyViewPage;
