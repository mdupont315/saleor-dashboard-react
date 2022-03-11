import { Grid, IconButton, TextField, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FormSpacer from "@saleor/components/FormSpacer";
// import { useIntl } from "react-intl";
// import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";

function DeliveryAreaCard({
  value,
  arrayHelpers,
  index,
  handleChange,
  handleBlur,
  touched,
  errors,
  canCustomDeliveryFee,
  canCustomMinOrder
}: any) {
  // const intl = useIntl();

  return (
    <>
      <FormSpacer />
      {/* <div
        style={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "auto auto auto"
        }}
      > */}

      <Grid container item xs={12} style={{ alignItems: "center" }}>
        <Grid item style={{ width: "20%", marginRight: "24px" }}>
          <TextField
            name={`deliveryArea.${index}.from`}
            label="From"
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
        </Grid>

        <Grid item style={{ width: "20%", marginRight: "24px" }}>
          <TextField
            name={`deliveryArea.${index}.to`}
            label="Until"
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
        </Grid>

        {canCustomDeliveryFee && (
          <Grid item style={{ width: "20%", marginRight: "24px" }}>
            <TextField
              name={`deliveryArea.${index}.customDeliveryFee`}
              label="Delivery Fee"
              fullWidth
              type="number"
              value={value.customDeliveryFee}
              onChange={handleChange}
            />
          </Grid>
        )}
        {canCustomMinOrder && (
          <Grid item style={{ width: "20%" }}>
            <TextField
              name={`deliveryArea.${index}.customMinOrder`}
              label="Min delivery order"
              fullWidth
              type="number"
              value={value.customMinOrder}
              onChange={handleChange}
            />
          </Grid>
        )}

        <Grid item style={{ width: "1%", marginLeft: "12px" }}>
          {" "}
          <div>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  arrayHelpers.remove(index);
                }}
                style={{ color: "#06847B" }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>

      <hr
        style={{
          border: "1px solid #EAEAEA",
          marginTop: "24px"
        }}
      ></hr>
      {/* </div> */}
    </>
  );
}

export default DeliveryAreaCard;
