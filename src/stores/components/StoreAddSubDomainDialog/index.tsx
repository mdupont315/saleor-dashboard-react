import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import { buttonMessages } from "@saleor/intl";
import { DialogProps } from "@saleor/types";
// import { maybe } from "@saleor/misc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface AddSubDomainDialogFormData {
  value: string;
}

export interface AddSubDomainDialog extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  onClose: () => void;
  open: boolean;
  variant: string;
  onConfirm: () => void;
}

const AddSubDomainDialog: React.FC<AddSubDomainDialog> = props => {
  const { onClose, open, confirmButtonState } = props;

  const intl = useIntl();

  const initialForm: AddSubDomainDialogFormData = {
    value: ""
  };
  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        {intl.formatMessage({
          defaultMessage: "Add domain name",
          description: "header"
        })}
      </DialogTitle>
      <Form initial={initialForm}>
        {({ change, submit }) => (
          <>
            <DialogContent>
              <p>
                Connect a domain name that you own for your customers to access
                it easier.
              </p>
              <TextField
                onChange={change}
                label={intl.formatMessage({
                  defaultMessage: "Your (sub)domain"
                })}
                fullWidth
                type="text"
                name="editUrl"
                // value={}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                onClick={submit}
              >
                <FormattedMessage {...buttonMessages.save} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

export default AddSubDomainDialog;
