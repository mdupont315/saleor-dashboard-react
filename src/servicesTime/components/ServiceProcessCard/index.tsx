import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";
import { useIntl } from "react-intl";

const renDeliveryTime = () => {
  const result = [];
  let t = 0;
  while (true) {
    if (t > 120) {
      break;
    }
    result.push(t);
    t += 5;
  }
  return result;
};

const renTimePicker = () => {
  const result = [];
  let t = 5;
  while (true) {
    if (t > 120) {
      break;
    }
    result.push(t);
    t += 5;
  }
  return result;
};

const renPreOrderDay = () => {
  const result = [];
  let t = 1;
  while (true) {
    if (t > 30) {
      break;
    }
    result.push(t);
    t += 1;
  }
  return result;
};

function ServiceProcessCard({
  titleHead,
  serviceProcess,
  type,
  setServiceProcess
}: any) {
  const intl = useIntl();
  const process =
    type === "delivery"
      ? serviceProcess.deliveryProcess
      : serviceProcess.pickupProcess;

  const handleChange = e => {
    if (type === "delivery") {
      setServiceProcess({
        ...serviceProcess,
        deliveryProcess: {
          ...serviceProcess.deliveryProcess,
          [e.target.name]:
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : e.target.value
        }
      });
    } else {
      setServiceProcess({
        ...serviceProcess,
        pickupProcess: {
          ...serviceProcess.pickupProcess,
          [e.target.name]:
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : e.target.value
        }
      });
    }
  };

  const CheckDisableAction = () => (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Max preorder days
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={process.preOrderDay}
              name="preOrderDay"
              onChange={handleChange}
              label="From"
            >
              {renPreOrderDay().map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item} days
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <ControlledSwitch
            name="sameDayOrder"
            label={`Enable same-day orders`}
            checked={process.sameDayOrder}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <FormSpacer />
    </>
  );
  return (
    <Card>
      <CardTitle title={intl.formatMessage(titleHead)} />
      <CardContent>
        <div>
          <p
            style={{
              borderBottom: "1px solid #EAEAEA",
              margin: "0 0 24px 0",
              padding: "0 0 12px 0",
              fontSize: "15px",
              lineHeight: "28px"
            }}
          >
            Standard {type} orders
          </p>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                {type === "delivery" ? "Delivery time" : "Pickup time"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={process.deliveryTime}
                name="deliveryTime"
                onChange={handleChange}
                label="From"
              >
                {renDeliveryTime().map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item} minutes
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Timepicker interval
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="timePickerGap"
                value={process.timePickerGap}
                onChange={handleChange}
                label="From"
              >
                {renTimePicker().map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item} minutes
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <FormSpacer />

        <ControlledSwitch
          name="asSoonAs"
          label={`Enable “as soon as possible” option`}
          checked={process.asSoonAs}
          onChange={handleChange}
        />

        <FormSpacer />
        <div>
          <p
            style={{
              borderBottom: "1px solid #EAEAEA",
              margin: "0 0 24px 0",
              padding: "0 0 12px 0",
              fontSize: "15px",
              lineHeight: "28px"
            }}
          >
            Scheduled {type} preorders
          </p>
        </div>

        <ControlledSwitch
          name="preOrder"
          label={`Enable scheduled preorders`}
          checked={process.preOrder}
          onChange={handleChange}
        />

        <FormSpacer />
        {type === "delivery" ? (
          serviceProcess.deliveryProcess.preOrder ? (
            <>{CheckDisableAction()}</>
          ) : null
        ) : serviceProcess.pickupProcess.preOrder ? (
          <>{CheckDisableAction()}</>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default ServiceProcessCard;
