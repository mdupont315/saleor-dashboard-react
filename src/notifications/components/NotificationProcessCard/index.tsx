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
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";
import { useIntl } from "react-intl";

import { InitialFormNotification } from "../Notification";

export interface ServiceProcessCard {
  values: InitialFormNotification;
  handleChange: any;
  setFieldValue: any;
  handleBlur: any;
  errors: any;
}

const ServiceProcessCard: React.FC<ServiceProcessCard> = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors
}) => {
  const intl = useIntl();
  return (
    <>
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
                      name="emailNotifications"
                      value={true}
                      control={<Radio />}
                      onBlur={handleBlur}
                      checked={values && values.emailNotifications === true}
                      label="Enable"
                      onChange={() => setFieldValue("emailNotifications", true)}
                    />
                    <FormControlLabel
                      name="emailNotifications"
                      value={false}
                      control={<Radio />}
                      onBlur={handleBlur}
                      checked={values && values.emailNotifications === false}
                      label="Disable"
                      onChange={() =>
                        setFieldValue("emailNotifications", false)
                      }
                    />
                  </div>
                </RadioGroup>
              </Grid>
              <Grid xs={6}>
                <FormSpacer />
                <TextField
                  error={!!errors.emailAddress}
                  helperText={errors.emailAddress}
                  // disabled={disabled}
                  fullWidth
                  label={intl.formatMessage({
                    defaultMessage: "Email address for notifications",
                    description: "Email address for notifications"
                  })}
                  name="emailAddress"
                  value={values && values.emailAddress}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
      <CardSpacer />
      <Card>
        <CardTitle title={"Print order receipt"} />
        <CardContent>
          <FormControl component="fieldset" fullWidth>
            <Grid container>
              <Grid xs={6}>
                <FormLabel component="legend">Print order receipt</FormLabel>
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
                      name="posEnable"
                      value={true}
                      control={<Radio />}
                      onBlur={handleBlur}
                      checked={values && values.posEnable === true}
                      label="Enable"
                      onChange={() => setFieldValue("posEnable", true)}
                    />
                    <FormControlLabel
                      name="posEnable"
                      value={false}
                      control={<Radio />}
                      onBlur={handleBlur}
                      checked={values && values.posEnable === false}
                      label="Disable"
                      onChange={() => setFieldValue("posEnable", false)}
                    />
                  </div>
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceProcessCard;
