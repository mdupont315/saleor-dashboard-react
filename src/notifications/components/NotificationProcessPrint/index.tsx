import { Card, CardContent, FormControl, Grid } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import React from "react";

interface InitialNotificationPrint {
  posEnable: boolean | null;
}

export interface ServiceProcessPrint {
  values: InitialNotificationPrint;
  handleChange: any;
}

const ServiceProcessPrint: React.FC<ServiceProcessPrint> = ({
  values,
  handleChange
}) => (
  <Card>
    <CardTitle title={"Automatic Order Receipt Printing"} />
    <CardContent>
      <FormControl component="fieldset" fullWidth>
        <Grid container>
          <Grid xs={12} sm={6}>
            <ControlledSwitch
              name="posEnable"
              label={`Enable automatic order receipt printing`}
              checked={values.posEnable}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </FormControl>
    </CardContent>
  </Card>
);
export default ServiceProcessPrint;
