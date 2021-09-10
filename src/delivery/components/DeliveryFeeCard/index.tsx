import { Card, CardContent, Grid, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
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

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.deliveryFees)} />
      <CardContent>
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Delivery fee"
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
                  errors.deliveryFee &&
                  touched.deliveryFee &&
                  errors.deliveryFee
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Minimum delivery order value"
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
                helperText={
                  errors.minOrder && touched.minOrder && errors.minOrder
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledSwitch
                name="enableForBigOrder"
                label={`Enable free delivery for big orders`}
                checked={values.enableForBigOrder}
                onChange={handleChange}
              />
            </Grid>
            {values.enableForBigOrder ? (
              <Grid item xs={6}>
                <TextField
                  label={intl.formatMessage({
                    defaultMessage: "Free delivery order value"
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
                    errors.fromDelivery &&
                    touched.fromDelivery &&
                    errors.fromDelivery
                  }
                  disabled={!values.enableForBigOrder}
                />
              </Grid>
            ) : null}
          </Grid>

          <FormSpacer />

          <FormSpacer />
        </>
      </CardContent>
    </Card>
  );
}

export default DeliveryFeeCard;
