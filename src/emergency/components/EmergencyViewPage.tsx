import { Container } from "@material-ui/core";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, sectionNames } from "@saleor/intl";
import { useUpdateStoreMutation } from "@saleor/stores/queries";
import { Form, Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";

import { useGetMyStore } from "../queries";
import EmergencyCard from "./EmergencyCard";

function EmergencyViewPage() {
  const intl = useIntl();

  const notify = useNotifier();

  const [updateEmergency, updateEmergencyOpts] = useUpdateStoreMutation({
    onCompleted: data => {
      if (data.storeUpdate.errors.length === 0) {
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

  const onSubmit = async value => {
    const temp = new Date();
    const variables = {
      id: data.myStore.id,
      input: {
        pickupStatus: new Date(temp.setDate(value.e_pickup)),
        deliveryStatus: new Date(temp.setDate(value.e_delivery))
      }
    };

    const result = await updateEmergency({
      variables
    });

    return result;
  };

  const { data, refetch } = useGetMyStore({ variables: {} });

  const compareStatus = values =>
    JSON.stringify({
      e_pickup: new Date(data?.myStore.pickupStatus).getDate(),
      e_delivery: new Date(data?.myStore.deliveryStatus).getDate()
    }) === JSON.stringify(values);

  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          e_pickup: new Date(data.myStore.pickupStatus).getDate(),
          e_delivery: new Date(data.myStore.deliveryStatus).getDate()
        }
      : {
          e_pickup: new Date().getDate(),
          e_delivery: new Date().getDate()
        };

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.emergency)} />
      {data !== undefined ? (
        <Formik initialValues={initialForm} onSubmit={onSubmit}>
          {({ handleSubmit, setFieldValue, values }) => (
            <Form>
              <EmergencyCard emergency={values} setFieldValue={setFieldValue} />
              <SaveButtonBar
                disabled={compareStatus(values)}
                state={updateEmergencyOpts.status}
                onSave={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default EmergencyViewPage;
