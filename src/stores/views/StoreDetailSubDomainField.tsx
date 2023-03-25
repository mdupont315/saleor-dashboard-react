import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

import StoreAddSubDomainDialog from "../components/StoreAddSubDomainDialog";

// enum FieldType {
//   shipping = "shippingAddress",
//   billing = "billingAddress"
// }

interface Props {
  action: string;
  id: string;
  onClose: () => void;
  onSubmit: (data: Partial<any>) => void;
}

const StoreDetailSubDomainFields = ({ action, onClose, onSubmit }: Props) => {
  const handleConfirm = () => {
    alert("ADD SUCCESSFULLY");
  };

  const validateSchema = yup.object().shape({
    customDomain: yup.string().required("Required!")
  });

  const initialForm = {
    customDomain: ""
  };

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validateSchema}
        onSubmit={values => onSubmit(values)}
      >
        {({ values, handleChange, handleSubmit, ...formikProps }) => (
          <>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <StoreAddSubDomainDialog
                {...formikProps}
                confirmButtonState="default"
                variant="custom-domain"
                open={action === "add-domain"}
                values={values}
                handleChange={handleChange}
                onClose={onClose}
                onConfirm={() => handleConfirm()}
                onSubmit={handleSubmit}
              />
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

export default StoreDetailSubDomainFields;
