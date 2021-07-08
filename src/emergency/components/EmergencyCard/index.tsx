import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

function EmergencyCard({ setEmergency, emergency }: any) {
  const intl = useIntl();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value === "true" ? true : false;
    if (value) {
      setEmergency({
        ...emergency,
        [name]: new Date().getDate() - 1
      });
    } else {
      setEmergency({
        ...emergency,
        [name]: new Date().getDate()
      });
    }
  };

  const compareToday = input => {
    if (input === new Date().getDate()) {
      return false;
    }
    return true;
  };

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.emergency)} />
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Delivery status</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="e_delivery"
            value={compareToday(emergency.e_delivery)}
            onChange={handleChange}
          >
            <div
              style={{
                display: "grid",
                gridColumnGap: "10px",
                gridTemplateColumns: "auto auto"
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Open" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Close"
              />
            </div>
          </RadioGroup>
        </FormControl>

        <FormSpacer />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Pickup status</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="e_pickup"
            value={compareToday(emergency.e_pickup)}
            onChange={handleChange}
          >
            <div
              style={{
                display: "grid",
                gridColumnGap: "10px",
                gridTemplateColumns: "auto auto"
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Open" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Close"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default EmergencyCard;
