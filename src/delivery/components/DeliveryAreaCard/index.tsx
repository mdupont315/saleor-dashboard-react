import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
// import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
function DeliveryAreaCard({}: any) {
  const intl = useIntl();

  // const handleChange = e => {
  //   console.log(e);
  // };

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.emergency)} />
      <CardContent>
        <div
          style={{
            display: "grid",
            gridGap: "20px",
            gridTemplateColumns: "auto auto auto"
          }}
        >
          <TextField
            label={intl.formatMessage({
              defaultMessage: "Up to*"
            })}
            name="name"
            fullWidth
            // value={values.name}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // error={errors.name && touched.name}
            // helperText={errors.name && touched.name && errors.name}
          />

          <TextField
            label={intl.formatMessage({
              defaultMessage: "Including*"
            })}
            name="name"
            fullWidth
            // value={values.name}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // error={errors.name && touched.name}
            // helperText={errors.name && touched.name && errors.name}
          />

          <div>
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>

          <FormSpacer />
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryAreaCard;
