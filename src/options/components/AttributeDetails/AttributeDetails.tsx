/* eslint-disable no-console */
import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { UseFormResult } from "@saleor/hooks/useForm";
import { commonMessages } from "@saleor/intl";
import { makeStyles } from "@saleor/theme";
import { getFormErrors } from "@saleor/utils/errors";
import getAttributeErrorMessage from "@saleor/utils/errors/attribute";
import React from "react";
import { useIntl } from "react-intl";

import { AttributePageFormData } from "../AttributePage";
import { messages } from "./messages";
// import { messages } from "./messages";

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
  // const { canChangeType, data, disabled, apiErrors, onChange } = props;
  const { data, disabled, apiErrors, onChange } = props;
  const classes = useStyles(props);
  const intl = useIntl();

  const formApiErrors = getFormErrors(
    ["name", "slug", "type", "entityType", "unit"],
    apiErrors
  );

  return (
    <Card>
      <CardTitle
        // title={intl.formatMessage(commonMessages.generalInformations)}
        title={commonMessages.generalInformations.defaultMessage}
      />
      <CardContent>
        <ControlledSwitch
          name={`enable`}
          label={`Enable this modifier`}
          checked={data.enable}
          onChange={onChange}
        />
        <FormSpacer />
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
      </CardContent>
    </Card>
  );
};
AttributeDetails.displayName = "AttributeDetails";
export default AttributeDetails;
