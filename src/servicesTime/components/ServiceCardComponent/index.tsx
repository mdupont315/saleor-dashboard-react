import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";
import { useIntl } from "react-intl";

const initTime = {
  days: [false, false, false, false, false, false, false],
  open: "00:00",
  close: "23:55"
};

interface IProps {
  titleHead?: any;
  serviceTime?: any;
  type?: string;
  setServiceTime?: any;
}

const checkDay = (input?: any) => {
  switch (input) {
    case 0:
      return "Mon";
    case 1:
      return "Tue";
    case 2:
      return "Wed";
    case 3:
      return "Thu";
    case 4:
      return "Fri";
    case 5:
      return "Sat";
    case 6:
      return "Sun";
  }
};

function padLeadingZeros(num, size) {
  let s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

const renHours = () => {
  const result = [];
  const hours = new Date();
  hours.setHours(0);
  hours.setMinutes(0);
  let t = 0;
  while (true) {
    t = hours.getMinutes() + 5;

    hours.setMinutes(t);
    result.push({
      label: `${padLeadingZeros(hours.getHours(), 2)}:${padLeadingZeros(
        hours.getMinutes(),
        2
      )}`,
      value: `${padLeadingZeros(hours.getHours(), 2)}:${padLeadingZeros(
        hours.getMinutes(),
        2
      )}`
    });
    if (hours.getHours() === 0 && hours.getMinutes() === 0) {
      break;
    }
  }
  return result;
};

function ServiceCardComponent({
  titleHead,
  serviceTime,
  type,
  setServiceTime
}: IProps) {
  const intl = useIntl();

  const handleChange = (_: any, indexItem: number, index: number) => {
    if (type === "delivery") {
      const editValue = [...serviceTime.deliveryService];
      editValue[indexItem] = {
        ...editValue[indexItem],
        days: editValue[indexItem].days.map((item, i) =>
          i === index ? !item : item
        )
      };
      setServiceTime({ ...serviceTime, deliveryService: editValue });
    } else {
      const editValue = [...serviceTime.pickupService];
      editValue[indexItem] = {
        ...editValue[indexItem],
        days: editValue[indexItem].days.map((item, i) =>
          i === index ? !item : item
        )
      };
      setServiceTime({ ...serviceTime, pickupService: editValue });
    }
  };
  const arr = renHours();

  const onAddNewTimeSlot = () => {
    const newTest = { ...initTime };
    if (type === "delivery") {
      const clone = {
        ...serviceTime,
        deliveryService: [...serviceTime.deliveryService, { ...newTest }]
      };
      setServiceTime(clone);
    } else {
      const clone = {
        ...serviceTime,
        pickupService: [...serviceTime.pickupService, { ...newTest }]
      };
      setServiceTime(clone);
    }
  };

  const onDeleteSlot = (index: number) => {
    if (type === "delivery") {
      const clone = { ...serviceTime };
      clone.deliveryService.splice(index, 1);
      setServiceTime(clone);
    } else {
      const clone = { ...serviceTime };
      clone.pickupService.splice(index, 1);
      setServiceTime(clone);
    }
  };

  const handleChangeTime = (e: any, indexItem: number, isFrom) => {
    if (type === "delivery") {
      const clone = { ...serviceTime };
      if (isFrom) {
        clone.deliveryService[indexItem].open = e.target.value;
      } else {
        clone.deliveryService[indexItem].close = e.target.value;
      }

      setServiceTime(clone);
    } else {
      const clone = { ...serviceTime };
      if (isFrom) {
        clone.pickupService[indexItem].open = e.target.value;
      } else {
        clone.pickupService[indexItem].close = e.target.value;
      }
      setServiceTime(clone);
    }
  };

  const listArr =
    type === "delivery"
      ? serviceTime.deliveryService
      : serviceTime.pickupService;
  return (
    <Card>
      <CardTitle title={intl.formatMessage(titleHead)} />
      <CardContent>
        {listArr.map((item: any, indexItem: number) => {
          const error = item.open > item.close;
          // if (error) {
          //   setIsError(error);
          // }
          return (
            <>
              <FormControl aria-label="Day">
                <FormGroup>
                  <div style={{ display: "flex" }}>
                    {item?.days.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={item}
                            // value={item.label}
                            onChange={e => handleChange(e, indexItem, index)}
                            name="checkedA"
                          />
                        }
                        label={checkDay(index)}
                      />
                    ))}
                  </div>
                </FormGroup>
              </FormControl>

              <FormSpacer />

              <div
                style={{
                  display: "grid",
                  gridColumnGap: "10px",
                  gridTemplateColumns: "auto auto"
                }}
              >
                <FormControl variant="outlined" fullWidth error={error}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    From
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item.open}
                    onChange={e => handleChangeTime(e, indexItem, true)}
                    label="From"
                  >
                    {(arr || []).map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && (
                    <FormHelperText>From have small than until</FormHelperText>
                  )}
                </FormControl>
                <FormControl variant="outlined" fullWidth error={error}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Until
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item.close}
                    onChange={e => handleChangeTime(e, indexItem, false)}
                    label="From"
                  >
                    {(arr || []).map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && (
                    <FormHelperText>From have small than until</FormHelperText>
                  )}
                </FormControl>
              </div>
              <FormSpacer />
              {indexItem !== 0 && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeleteSlot(indexItem)}
                  >
                    Delete timeslot
                  </Button>
                </div>
              )}

              <FormSpacer />
              <hr />
              <FormSpacer />
            </>
          );
        })}

        <Button variant="contained" color="primary" onClick={onAddNewTimeSlot}>
          Add a timeslot
        </Button>
      </CardContent>
    </Card>
  );
}

export default ServiceCardComponent;
