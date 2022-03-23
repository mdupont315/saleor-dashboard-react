/* eslint-disable no-console */
import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { UseFormResult } from "@saleor/hooks/useForm";
import { makeStyles } from "@saleor/theme";
import React from "react";
import { useIntl } from "react-intl";

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
  // const { canChangeType, data, disabled, apiErrors, onChange } = props;
  const { data, onChange } = props;
  const classes = useStyles(props);
  const intl = useIntl();

  console.log(onChange);
  console.log(data);

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
          // onChange={handleChangeType}
        />
        <FormSpacer />
        <div className={classes.inputTypeSection}>
          <ControlledSwitch
            name={"type" as keyof AttributePageFormData}
            label={`Allow customers to select multiple items`}
            // label={intl.formatMessage(messages.type)}
            // checked={!!data.type}
            checked={isMultiple}
            // onChange={onChange}
            onChange={handleChangeType}
          />
        </div>
        <FormSpacer />
        {isMultiple && (
          <TextField
            // disabled={disabled}
            // error={!!formApiErrors.name}
            label={`Maximum amount of options customers can select`}
            name={`maxOptions`}
            fullWidth
            // helperText={getAttributeErrorMessage(formApiErrors.name, intl)}
            value={data.maxOptions}
            onChange={onChange}
          />
        )}
      </CardContent>
    </Card>
  );
};
AttributeRules.displayName = "AttributeRules";
export default AttributeRules;
