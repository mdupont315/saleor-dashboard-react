import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
// import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

function DeliveryFeeCard({}: any) {
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
            name="name"
            // value={values.name}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // error={errors.name && touched.name}
            // helperText={errors.name && touched.name && errors.name}
          />

          <FormSpacer />

          <TextField
            label={intl.formatMessage({
              defaultMessage: "Min. order value for delivery orders*"
            })}
            fullWidth
            type="number"
            name="name"
            // value={values.name}
            // onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            // onBlur={handleBlur}
            // error={errors.name && touched.name}
            // helperText={errors.name && touched.name && errors.name}
          />
          <FormSpacer />

          <TextField
            label={intl.formatMessage({
              defaultMessage: "Free delivery from"
            })}
            fullWidth
            type="number"
            name="name"
            // value={values.name}
            // onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            // onBlur={handleBlur}
            // error={errors.name && touched.name}
            // helperText={errors.name && touched.name && errors.name}
          />
        </>
      </CardContent>
    </Card>
  );
}

export default DeliveryFeeCard;
