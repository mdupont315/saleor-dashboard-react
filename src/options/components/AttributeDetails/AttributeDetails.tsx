import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import FormSpacer from "@saleor/components/FormSpacer";
import SingleSelectField from "@saleor/components/SingleSelectField";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { UseFormResult } from "@saleor/hooks/useForm";
import { commonMessages } from "@saleor/intl";
import { makeStyles } from "@saleor/theme";
import { OptionInputTypeEnum } from "@saleor/types/globalTypes";
import { getFormErrors } from "@saleor/utils/errors";
import getAttributeErrorMessage from "@saleor/utils/errors/attribute";
import React from "react";
import { useIntl } from "react-intl";

import { AttributePageFormData } from "../AttributePage";
import { inputTypeMessages, messages } from "./messages";

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
  { name: "AttributeDetails" }
);

export interface AttributeDetailsProps
  extends Pick<
    UseFormResult<AttributePageFormData>,
    "set" | "setError" | "data" | "clearErrors" | "errors"
  > {
  canChangeType: boolean;
  disabled: boolean;
  apiErrors: AttributeErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const AttributeDetails: React.FC<AttributeDetailsProps> = props => {
  const { canChangeType, data, disabled, apiErrors, onChange } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const inputTypeChoices = [
    {
      label: intl.formatMessage(inputTypeMessages.single),
      value: OptionInputTypeEnum.SINGLE
    },
    {
      label: intl.formatMessage(inputTypeMessages.multiple),
      value: OptionInputTypeEnum.MULTIPLE
    }
  ];

  const formApiErrors = getFormErrors(
    ["name", "slug", "inputType", "entityType", "unit"],
    apiErrors
  );

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formApiErrors.name}
          label={intl.formatMessage(messages.attributeLabel)}
          name={"name" as keyof AttributePageFormData}
          fullWidth
          helperText={getAttributeErrorMessage(formApiErrors.name, intl)}
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <div className={classes.inputTypeSection}>
          <SingleSelectField
            choices={inputTypeChoices}
            disabled={disabled || !canChangeType}
            error={!!formApiErrors.inputType}
            hint={getAttributeErrorMessage(formApiErrors.inputType, intl)}
            label={intl.formatMessage(messages.inputType)}
            name="type"
            onChange={onChange}
            value={data.type}
          />
        </div>
        <FormSpacer />
        <ControlledCheckbox
          name={"required" as keyof AttributePageFormData}
          label={intl.formatMessage(messages.valueRequired)}
          checked={data.required}
          onChange={onChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};
AttributeDetails.displayName = "AttributeDetails";
export default AttributeDetails;
