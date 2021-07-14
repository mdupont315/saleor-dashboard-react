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
  handleBlur
}: any) {
  const intl = useIntl();

  // const handleChange = e => {
  //   console.log(e);
  // };

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
          value={value.from}
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
