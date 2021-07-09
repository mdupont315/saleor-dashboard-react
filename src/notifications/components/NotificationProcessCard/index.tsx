import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";
import { useIntl } from "react-intl";

function ServiceProcessCard() {
  const intl = useIntl();
  return (
    <Card>
      <CardTitle title={"New order notifications"} />
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          <Grid container>
            <Grid xs={6}>
              <FormLabel component="legend">Email notifications</FormLabel>
              <p></p>
              <RadioGroup aria-label="gender" name="sameDayOrder">
                <div
                  style={{
                    display: "grid",
                    gridColumnGap: "10px",
                    gridTemplateColumns: "auto auto"
                  }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Enable"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Disable"
                  />
                </div>
              </RadioGroup>
            </Grid>
            <Grid xs={6}>
              <FormSpacer />
              <TextField
                // error={!!formErrors.name}
                // helperText={getProductErrorMessage(formErrors.name, intl)}
                // disabled={disabled}
                fullWidth
                label={intl.formatMessage({
                  defaultMessage: "Email address for notifications",
                  description: "Email address for notifications"
                })}
                name="name"
                // value={data.name}
                // onChange={onChange}
              />
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default ServiceProcessCard;
