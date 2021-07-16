import { IconButton, TextField, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FormSpacer from "@saleor/components/FormSpacer";
// import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";
import { useIntl } from "react-intl";

function DeliveryAreaCard({
  value,
  arrayHelpers,
  index,
  handleChange,
  handleBlur,
  touched,
  errors
}: any) {
  const intl = useIntl();

  return (
    <>
      <FormSpacer />
      <div
        style={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "auto auto auto"
        }}
      >
        <TextField
          label={intl.formatMessage({
            defaultMessage: "Up to*"
          })}
          name={`deliveryArea.${index}.to`}
          fullWidth
          type="number"
          helperText={
            errors &&
            errors.deliveryArea &&
            errors.deliveryArea[index] &&
            errors.deliveryArea[index]?.to
          }
          error={
            errors &&
            errors.deliveryArea &&
            errors.deliveryArea[index] &&
            errors.deliveryArea[index]?.to &&
            touched &&
            touched.deliveryArea &&
            touched.deliveryArea[index] &&
            touched.deliveryArea[index]?.to
          }
          value={value.to}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextField
          label={intl.formatMessage({
            defaultMessage: "Including*"
          })}
          name={`deliveryArea.${index}.from`}
          fullWidth
          type="number"
          value={value.from}
          helperText={
            errors &&
            errors.deliveryArea &&
            errors.deliveryArea[index] &&
            errors.deliveryArea[index]?.from
          }
          error={
            errors &&
            errors.deliveryArea &&
            errors.deliveryArea[index] &&
            errors.deliveryArea[index]?.from &&
            touched &&
            touched.deliveryArea &&
            touched.deliveryArea[index] &&
            touched.deliveryArea[index]?.from
          }
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                arrayHelpers.remove(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default DeliveryAreaCard;
