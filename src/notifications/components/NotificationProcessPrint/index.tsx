import {
  Card,
  CardContent,
  FormControl,
  Grid,
  makeStyles
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    title: {
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "28px"
    }
  }),
  { name: "NotificationProcessCard" }
);

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
}) => {
  const S = useStyles();

  return (
    <Card>
      <CardTitle title={"Automactic Order Receipt Printing"} />
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          <Grid container>
            <Grid xs={6}>
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
};
export default ServiceProcessPrint;
