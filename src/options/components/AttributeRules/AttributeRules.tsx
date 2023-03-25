/* eslint-disable prefer-const */
/* eslint-disable no-console */
import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { UseFormResult } from "@saleor/hooks/useForm";
import { makeStyles } from "@saleor/theme";
import React from "react";

import { AttributePageFormData } from "../AttributePage";
// import { inputTypeMessages, messages } from "./messages";

const useStyles = makeStyles(
  theme => ({
    inputTypeSection: {
      columnGap: theme.spacing(2) + "px",
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexFlow: "wrap",
        rowGap: theme.spacing(3) + "px"
      }
    }
  }),
  { name: "AttributeRules" }
);

export interface AttributeRulesProps
  extends Pick<
    UseFormResult<AttributePageFormData>,
    "set" | "setError" | "data" | "clearErrors" | "errors"
  > {
  canChangeType: boolean;
  disabled: boolean;
  apiErrors: AttributeErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const AttributeRules: React.FC<AttributeRulesProps> = props => {
  const { data, onChange, setError, errors, clearErrors } = props;
  const classes = useStyles(props);

  // Set error for maxOPtions
  const isError = e => {
    const value = e.target.value;
    const regex = /^[1-9][0-9]*$/;
    const isInt = regex.test(value);
    // Is interger
    if (!isInt) {
      setError("maxOptions", "Must be only digits");
    }
    return isInt;
  };

  const handleChangeType = e => {
    const { value } = e.target;
    const newEventTarget = {
      ...e.target,
      value: value ? "multiple" : "single"
    };
    const newEvent = {
      ...e,
      target: newEventTarget
    };
    onChange(newEvent);
  };

  const isMultiple = data.type === "multiple";

  return (
    <Card>
      <CardTitle title={`Modifier Rules`} />
      <CardContent>
        <FormSpacer />
        <ControlledSwitch
          name={"required" as keyof AttributePageFormData}
          label={`Require customers to select at least 1 option`}
          // label={intl.formatMessage(messages.valueRequired)}
          checked={data.required}
          onChange={onChange}
        />
        <FormSpacer />
        <div className={classes.inputTypeSection}>
          <ControlledSwitch
            name={"type" as keyof AttributePageFormData}
            label={`Allow customers to select multiple items`}
            checked={isMultiple}
            onChange={handleChangeType}
          />
        </div>
        <FormSpacer />
        {isMultiple && (
          <TextField
            error={!!errors.maxOptions}
            label={`Maximum amount of options customers can select`}
            name={`maxOptions`}
            fullWidth
            helperText={errors.maxOptions}
            value={data.maxOptions}
            onChange={e => {
              onChange(e);
              // break function  -----> check value input -------> return boolean -----------> clear error
              isError(e);
              if (isError(e)) {
                clearErrors("maxOptions");
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
AttributeRules.displayName = "AttributeRules";
export default AttributeRules;
