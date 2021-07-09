import { Button, Container } from "@material-ui/core";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, sectionNames } from "@saleor/intl";
import { useUpdateStoreMutation } from "@saleor/stores/queries";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useGetMyStore } from "../queries";
import DeliveryAreaCard from "./DeliveryAreaCard";
import DeliveryFeeCard from "./DeliveryFeeCard";

function DeliveryViewPage() {
  const intl = useIntl();

  const notify = useNotifier();

  const [updateEmergency] = useUpdateStoreMutation({
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
    const variables = {
      id: "U3RvcmU6MQ=="
    };

    updateEmergency({
      variables
    });
  };

  const { data } = useGetMyStore({ variables: {} });

  // React.useEffect(() => {}, [data]);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.emergency)}>
        <Button color="primary" variant="contained" onClick={handleClick}>
          <FormattedMessage
            defaultMessage="Save changes"
            description="button"
          />
        </Button>
      </PageHeader>
      <DeliveryAreaCard />
      <FormSpacer />
      <DeliveryFeeCard />
    </Container>
  );
}

export default DeliveryViewPage;
