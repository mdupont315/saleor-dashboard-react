import React from "react";
import * as yup from "yup";

import SignUpSiteForm from "../components/SignUpSiteForm";
import SignUpSuccess from "./SignUpSuccess";

interface IProps {
  title?: any;
}
const initialForm = {
  name: "",
  domain: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  postalcode: "",
  city: ""
};

const validateSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  domain: yup.string().required("Required!"),
  phone: yup.string().required("Required!"),
  address: yup.string().required("Required!"),
  postalcode: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required!")
    .email("Invalid Email!"),
  password: yup
    .string()
    .required("Required!")
    .min(8, "Too Short!"),
  resetPassword: yup
    .string()
    .required("Required!")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

function SignUpSite({}: IProps) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  return (
    <>
      {isSuccess ? (
        <SignUpSuccess />
      ) : (
        <SignUpSiteForm
          initialForm={initialForm}
          validateSchema={validateSchema}
          onSubmit={values => console.log(values)}
        />
      )}
    </>
  );
}

export default SignUpSite;
