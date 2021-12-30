import React from "react";

import StoreAddSubDomainDialog from "../components/StoreAddSubDomainDialog";

// enum FieldType {
//   shipping = "shippingAddress",
//   billing = "billingAddress"
// }

interface Props {
  action: string;
  id: string;
  onClose: () => void;
}

const StoreDetailSubDomainFields = ({ action, onClose }: Props) => {
  const handleConfirm = () => {
    alert("ADD SUCCESSFULLY");
  };

  return (
    <>
      <StoreAddSubDomainDialog
        confirmButtonState="default"
        variant="custom-domain"
        open={action === "add-domain"}
        onClose={onClose}
        onConfirm={() => handleConfirm()}
      />
    </>
  );
};

export default StoreDetailSubDomainFields;
