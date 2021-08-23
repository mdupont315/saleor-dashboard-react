import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { useGetMyStore } from "@saleor/emergency/queries";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { secvicesSection } from "@saleor/servicesTime/urls";
import { useUpdateStoreMutation } from "@saleor/stores/queries";
import { Form, Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

function QuickSettingsCard() {
  const intl = useIntl();
  const notify = useNotifier();

  //   const data = "";
  const { data, refetch } = useGetMyStore({ variables: {} });

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
        deliveryStatus: new Date(temp.setDate(value.e_delivery)),
        tableServiceStatus: new Date(temp.setDate(value.e_table))
      }
    };

    const result = await updateEmergency({
      variables
    });

    return result;
  };

  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          e_pickup: new Date(data.myStore.pickupStatus).getDate(),
          e_delivery: new Date(data.myStore.deliveryStatus).getDate(),
          e_table: new Date(data.myStore.tableServiceStatus).getDate()
        }
      : {
          e_pickup: new Date().getDate(),
          e_delivery: new Date().getDate(),
          e_table: new Date().getDate()
        };

  const compareStatus = values =>
    JSON.stringify({
      e_pickup: new Date(data?.myStore.pickupStatus).getDate(),
      e_delivery: new Date(data?.myStore.deliveryStatus).getDate(),
      e_table: new Date(data?.myStore.tableServiceStatus).getDate()
    }) === JSON.stringify(values);

  const compareToday = input => input === new Date().getDate();

  const date = new Date().getDate();

  return (
    <>
      {data !== undefined ? (
        <Formik initialValues={initialForm} onSubmit={onSubmit}>
          {({ handleSubmit, setFieldValue, values }) => (
            <Form>
              <Card>
                <CardTitle
                  title={intl.formatMessage({
                    defaultMessage: "Quick settings",
                    description: "header",
                    id: "homeProductsListCardHeader"
                  })}
                />

                <CardContent>
                  <ControlledSwitch
                    name="e_delivery"
                    label={`Enable delivery orders`}
                    checked={compareToday(values.e_delivery)}
                    onChange={e =>
                      setFieldValue(
                        "e_delivery",
                        e.target.value === false ? date - 1 : date
                      )
                    }
                  />

                  <ControlledSwitch
                    name="e_pickup"
                    label={`Enable pickup orders`}
                    checked={compareToday(values.e_pickup)}
                    onChange={e =>
                      setFieldValue(
                        "e_pickup",
                        e.target.value === false ? date - 1 : date
                      )
                    }
                  />

                  <ControlledSwitch
                    name="e_table"
                    label={`Enable QR orders`}
                    checked={compareToday(values.e_table)}
                    onChange={e =>
                      setFieldValue(
                        "e_table",
                        e.target.value === false ? date - 1 : date
                      )
                    }
                  />

                  <h2
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#616161"
                      //   padding: 0,
                      //   margin: 0
                    }}
                  >
                    When disabled, these will override your{" "}
                    <Link
                      style={{ color: "#06847B", textDecoration: "none" }}
                      to={secvicesSection}
                    >
                      Ordering Settings.
                    </Link>
                  </h2>
                </CardContent>
              </Card>
              {/* <EmergencyCard emergency={values} setFieldValue={setFieldValue} /> */}
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
    </>
  );
}

export default QuickSettingsCard;
