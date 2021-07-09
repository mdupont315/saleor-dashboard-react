import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
// import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

function EmergencyCard({ setEmergency, emergency }: any) {
  const intl = useIntl();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
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
        <ControlledSwitch
          name="e_delivery"
          label={`Delivery ${
            compareToday(emergency.e_delivery) ? "close" : "open"
          }`}
          checked={compareToday(emergency.e_delivery)}
          onChange={handleChange}
          // disabled={disabled}
        />

        <ControlledSwitch
          name="e_pickup"
          label={`Pickup ${
            compareToday(emergency.e_pickup) ? "close" : "open"
          }`}
          checked={compareToday(emergency.e_pickup)}
          onChange={handleChange}
          // disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}

export default EmergencyCard;
