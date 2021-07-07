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
    setEmergency({
      ...emergency,
      [e.target.name]: parseInt(e.target.value, 0)
    });
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
            value={emergency.e_delivery}
            onChange={handleChange}
          >
            <div
              style={{
                display: "grid",
                gridColumnGap: "10px",
                gridTemplateColumns: "auto auto"
              }}
            >
              <FormControlLabel
                value={new Date().getDate() - 1}
                control={<Radio />}
                label="Open"
              />
              <FormControlLabel
                value={new Date().getDate()}
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
            value={emergency.e_pickup}
            onChange={handleChange}
          >
            <div
              style={{
                display: "grid",
                gridColumnGap: "10px",
                gridTemplateColumns: "auto auto"
              }}
            >
              <FormControlLabel
                value={new Date().getDate() - 1}
                control={<Radio />}
                label="Open"
              />
              <FormControlLabel
                value={new Date().getDate()}
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
