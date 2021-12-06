import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";
import * as yup from "yup";

import LoginLoading from "../../auth/components/LoginLoading/LoginLoading";
import SignUpSiteForm from "../components/SignUpSiteForm";
import { storeRegisterMutation } from "../mutations";
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
  const [redirectUrl, setRedirectUrl] = React.useState("");
  const notify = useNotifier();
  const intl = useIntl();

  const [createStore, { loading }] = useMutation(storeRegisterMutation, {
    onCompleted: data => {
      if (data.storeCreate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        setIsSuccess(true);
      } else {
        notify({
          status: "error",
          text: intl.formatMessage({
            defaultMessage: "Create Fail! Please Try Again!"
          })
        });
      }
    },
    onError: err =>
      notify({
        status: "error",
        text: err.graphQLErrors.length > 0 && err.graphQLErrors[0].message
      })
  });

  const handleSubmit = (data: Partial<any>) => {
    const variables: any = {
      input: {
        name: data.name,
        domain: `${data.domain}.orderich.app`,
        email: data.email,
        password: data.password
      }
    };
    setRedirectUrl(`${data.domain}.orderich.app`);
    createStore({
      variables
    });
  };

  return (
    <>
      {isSuccess ? (
        <SignUpSuccess redirectUrl={redirectUrl} />
      ) : loading ? (
        <LoginLoading />
      ) : (
        <SignUpSiteForm
          initialForm={initialForm}
          validateSchema={validateSchema}
          onSubmit={values => handleSubmit(values)}
        />
      )}
    </>
  );
}

export default SignUpSite;
