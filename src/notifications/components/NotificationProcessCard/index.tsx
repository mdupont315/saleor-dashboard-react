import {
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  makeStyles,
  TextField
} from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import Hr from "@saleor/components/Hr";
import React from "react";
import { useIntl } from "react-intl";

import { InitialFormNotification } from "../Notification";

const useStyles = makeStyles(
  () => ({
    title: {
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "28px"
    }
  }),
  { name: "NotificationProcessCard" }
);

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
  // handleBlur,
  // setFieldValue,
  errors
}) => {
  const intl = useIntl();
  const S = useStyles();

  return (
    <>
      <Card>
        <CardTitle title={"Notification Settings"} />
        <CardContent>
          <FormControl component="fieldset" fullWidth>
            <Grid container>
              <Grid xs={12}>
                <FormLabel className={S.title} component="legend">
                  Sound notifications
                </FormLabel>

                <Hr />
                <FormSpacer />

                <ControlledSwitch
                  name="soundNotifications"
                  label={`Enable sound notifications`}
                  checked={values.soundNotifications}
                  onChange={handleChange}
                />
              </Grid>

              <Grid xs={12}>
                <FormSpacer />
                <FormLabel className={S.title} component="legend">
                  Email notifications
                </FormLabel>

                <Hr />
                <FormSpacer />
                {/* <RadioGroup aria-label="gender" name="sameDayOrder">
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
                </RadioGroup> */}

                <ControlledSwitch
                  name="emailNotifications"
                  label={`Enable email notifications`}
                  checked={values.emailNotifications}
                  onChange={handleChange}
                />
                <FormSpacer />
              </Grid>

              {values.emailNotifications && (
                <Grid xs={12} sm={6}>
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
              )}
            </Grid>
          </FormControl>
        </CardContent>
      </Card>

      <CardSpacer />
    </>
  );
};

export default ServiceProcessCard;
