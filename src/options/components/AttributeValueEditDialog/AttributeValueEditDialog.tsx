import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import { ChannelsAction } from "@saleor/channels/urls";
import { ChannelSaleData, createSortedSaleData } from "@saleor/channels/utils";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableHead from "@saleor/components/TableHead";
import { saleAddUrl, SaleCreateUrlQueryParams } from "@saleor/discounts/urls";
import useChannels from "@saleor/hooks/useChannels";
import useNavigator from "@saleor/hooks/useNavigator";
import { buttonMessages } from "@saleor/intl";
import { renderCollection } from "@saleor/misc";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

import { useStyles } from "./styles";

export interface ChannelOptinData {
  currency: string;
  discountValue: string;
  id: string;
  name: string;
}

export interface AttributeValueEditDialogFormData {
  name: string;
  channelListing: ChannelOptinData[];
}

export interface defaultInput {
  currency: string;
  discountValue: string;
  id: string;
  name: string;
}

export interface AttributeValueEditDialogProps {
  attributeValue: AttributeValueEditDialogFormData | null;
  confirmButtonState?: ConfirmButtonTransitionState;
  disabled: boolean;
  open: boolean;
  onSubmit: (data: AttributeValueEditDialogFormData) => void;
  onClose: () => void;
  params?: string;
  defaultInput?: any[] | null;
}

export interface channelProps {
  id: string;
  __typename: string;
}

const numberOfColumns = 2;

const AttributeValueEditDialog: React.FC<AttributeValueEditDialogProps> = ({
  attributeValue,
  params,
  confirmButtonState,
  disabled,
  onClose,
  onSubmit,
  open
}) => {
  const navigate = useNavigator();
  const intl = useIntl();
  const classes = useStyles({});

  const [openModal, closeModal] = createDialogActionHandlers<
    ChannelsAction,
    SaleCreateUrlQueryParams
  >(navigate, params => saleAddUrl(params), {});

  const { availableChannels } = useAppChannel(false);
  const allChannels: ChannelSaleData[] = createSortedSaleData(
    availableChannels
  );

  const { currentChannels } = useChannels(
    allChannels,
    { params },
    { closeModal, openModal }
  );

  const initialForm =
    params === "edit-value" &&
    attributeValue &&
    Object.keys(attributeValue).length > 0
      ? {
          name: attributeValue?.name ?? "",
          channelListing: attributeValue?.channelListing ?? []
        }
      : {
          name: "",
          channelListing: currentChannels
        };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {attributeValue === null ? (
          <FormattedMessage
            defaultMessage="Add option"
            description="add attribute value"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Edit option"
            description="edit attribute value"
          />
        )}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Formik
          initialValues={initialForm}
          validationSchema={validationShema}
          onSubmit={onSubmit}
        >
          {({ handleChange, values, errors }) => (
            <Form>
              <TextField
                classes={{ root: classes.formControlRoot }}
                InputLabelProps={{
                  classes: { root: classes.inputLabelRoot }
                }}
                autoFocus
                disabled={disabled}
                error={!!errors.name}
                fullWidth
                helperText={errors.name}
                name={"name"}
                label={intl.formatMessage({
                  defaultMessage: "Option Name",
                  description: "attribute name"
                })}
                value={values.name}
                onChange={handleChange}
              />
              <FieldArray
                name="channelListing"
                render={() => (
                  <>
                    <Card className={classes.wrapperCard}>
                      <p className={classes.textContent}>
                        Below you add a price for the modifier option. This
                        price will be added to the product price. Leave it empty
                        if this option is free of charge.
                      </p>
                      <CardContent className={classes.card}>
                        {/* <Typography variant="caption" className={classes.info}>
                          <FormattedMessage
                            defaultMessage="Channels that don’t have assigned discounts will use their parent channel to define the price. Price will be converted to channel’s currency"
                            description="channels sale info"
                          />
                        </Typography> */}
                        <div className={classes.tableContainer}>
                          <ResponsiveTable className={classes.table}>
                            <TableHead
                              colSpan={numberOfColumns}
                              disabled={disabled}
                              items={[]}
                            >
                              <TableCell className={classes.colName}>
                                <span>
                                  <FormattedMessage
                                    defaultMessage="Channel name"
                                    description="column title"
                                  />
                                </span>
                              </TableCell>
                              <TableCell className={classes.colType}>
                                <span>
                                  <FormattedMessage
                                    defaultMessage="Price"
                                    description=""
                                  />
                                </span>
                              </TableCell>
                            </TableHead>
                            <TableBody>
                              {renderCollection(
                                values.channelListing,
                                (listing, index) => (
                                  <TableRow
                                    key={listing?.id || `skeleton-${index}`}
                                    className={classes.row}
                                  >
                                    <TableCell>
                                      <Typography>
                                        {listing?.name || <Skeleton />}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      {listing ? (
                                        <TextField
                                          disabled={disabled}
                                          /* helperText={
                                                        error
                                                          ? getDiscountErrorMessage(
                                                              formErrors.value,
                                                              intl
                                                            )
                                                          : ""
                                                      }
                                                   */
                                          name={`channelListing.${index}.discountValue`}
                                          label={intl.formatMessage({
                                            defaultMessage: "Price",
                                            description: ""
                                          })}
                                          value={listing?.discountValue || "0"}
                                          onChange={handleChange}
                                          type="number"
                                          fullWidth
                                          inputProps={{
                                            min: 0
                                          }}
                                          InputProps={{
                                            endAdornment: listing.currency
                                          }}
                                          InputLabelProps={{
                                            classes: {
                                              root: classes.inputLabelRoot
                                            }
                                          }}
                                        />
                                      ) : (
                                        <Skeleton />
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ),
                                () => (
                                  <TableRow>
                                    <TableCell colSpan={numberOfColumns}>
                                      <FormattedMessage defaultMessage="No channels found" />
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </ResponsiveTable>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              />
              <DialogActions className={classes.dialogAction}>
                <Button onClick={onClose}>
                  <FormattedMessage {...buttonMessages.back} />
                </Button>
                <ConfirmButton
                  transitionState={confirmButtonState}
                  color="primary"
                  variant="contained"
                  onClick={() => onSubmit(values)}
                >
                  <FormattedMessage {...buttonMessages.save} />
                </ConfirmButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const validationShema = Yup.object().shape({
  name: Yup.string().required("Please enter the required field")
});

AttributeValueEditDialog.displayName = "AttributeValueEditDialog";
export default AttributeValueEditDialog;
