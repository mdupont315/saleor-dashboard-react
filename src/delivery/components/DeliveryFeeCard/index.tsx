import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
// import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

function DeliveryFeeCard({
  values,
  handleChange,
  handleBlur,
  touched,
  errors
}: any) {
  const intl = useIntl();

  // const handleChange = e => {};

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.emergency)} />
      <CardContent>
        <>
          <TextField
            label={intl.formatMessage({
              defaultMessage: "Delivery fee*"
            })}
            fullWidth
            type="number"
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            name="deliveryFee"
            value={values.deliveryFee}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.deliveryFee && touched.deliveryFee}
            helperText={
              errors.deliveryFee && touched.deliveryFee && errors.deliveryFee
            }
          />

          <FormSpacer />

          <TextField
            label={intl.formatMessage({
              defaultMessage: "Min. order value for delivery orders*"
            })}
            fullWidth
            type="number"
            name="minOrder"
            value={values.minOrder}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            onBlur={handleBlur}
            error={errors.minOrder && touched.minOrder}
            helperText={errors.minOrder && touched.minOrder && errors.minOrder}
          />
          <FormSpacer />
          <TextField
            label={intl.formatMessage({
              defaultMessage: "Free delivery from"
            })}
            fullWidth
            type="number"
            name="fromDelivery"
            value={values.fromDelivery}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            onBlur={handleBlur}
            error={errors.fromDelivery && touched.fromDelivery}
            helperText={
              errors.fromDelivery && touched.fromDelivery && errors.fromDelivery
            }
          />
        </>
      </CardContent>
    </Card>
  );
}

export default DeliveryFeeCard;
