import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";
import { useIntl } from "react-intl";

const renDeliveryTime = () => {
  const result = [];
  let t = 0;
  while (true) {
    if (t >= 500) {
      break;
    }
    result.push(t);
    t += 10;
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
  return (
    <Card>
      <CardTitle title={intl.formatMessage(titleHead)} />
      <CardContent>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Delivery time
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

        <FormSpacer />

        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Timepicker gap
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="timePickerGap"
            value={process.timePickerGap}
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

        <FormSpacer />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">As soon as possible option</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="asSoonAs"
            value={process.asSoonAs}
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
        </FormControl>

        <FormSpacer />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Allow preorders</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="preOrder"
            value={process.preOrder}
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
        </FormControl>

        <FormSpacer />

        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Preorder day
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
                {item} day
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormSpacer />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Same-day orders</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="sameDayOrder"
            value={process.sameDayOrder}
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
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default ServiceProcessCard;
