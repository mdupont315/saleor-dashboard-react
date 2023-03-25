import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
// import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

function EmergencyCard({ emergency, setFieldValue }: any) {
  const intl = useIntl();

  const compareToday = input => input === new Date().getDate();

  const date = new Date().getDate();

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
          onChange={e =>
            setFieldValue(
              "e_delivery",
              e.target.value === false ? date - 1 : date
            )
          }
        />
        <ControlledSwitch
          name="e_pickup"
          label={`Pickup ${
            compareToday(emergency.e_pickup) ? "close" : "open"
          }`}
          checked={compareToday(emergency.e_pickup)}
          onChange={e =>
            setFieldValue(
              "e_pickup",
              e.target.value === false ? date - 1 : date
            )
          }
        />
      </CardContent>
    </Card>
  );
}

export default EmergencyCard;
