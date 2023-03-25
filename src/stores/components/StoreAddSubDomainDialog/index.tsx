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
// import Form from "@saleor/components/Form";
import { FormChange } from "@saleor/hooks/useForm";
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
  values: Partial<any>;
  handleChange: FormChange;
  onConfirm: () => void;
  onSubmit: (data: Partial<any>) => void;
}

const AddSubDomainDialog: React.FC<AddSubDomainDialog> = props => {
  const { onClose, open, confirmButtonState, handleChange, onSubmit } = props;
  // const { errors, touched, handleBlur, setFieldValue }: any = formikProps;

  const intl = useIntl();

  // const initialForm: AddSubDomainDialogFormData = {
  //   value: ""
  // };

  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        {intl.formatMessage({
          defaultMessage: "Add domain name",
          description: "header"
        })}
      </DialogTitle>
      <div>
        <DialogContent>
          <p>
            Connect a domain name that you own for your customers to access it
            easier.
          </p>
          <TextField
            onChange={handleChange}
            label={intl.formatMessage({
              defaultMessage: "Your (sub)domain"
            })}
            fullWidth
            type="text"
            name="customDomain"
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
            onClick={onSubmit}
          >
            <FormattedMessage {...buttonMessages.save} />
          </ConfirmButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddSubDomainDialog;
