// import { END_POINT } from "@saleor/config";
import useNotifier from "@saleor/hooks/useNotifier";
// import { commonMessages } from "@saleor/intl";
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
  postalCode: "",
  city: ""
};

const validateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required!")
    .max(60, "Store name can only contain 60 characters"),
  domain: yup.string().required("Required!"),
  phone: yup.string().required("Required!"),
  address: yup.string().required("Required!"),
  postalCode: yup.string().required("Required"),
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
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [redirectUrl, setRedirectUrl] = React.useState("");
  const [storeName, setStoreName] = React.useState("");
  // const [showSignUpSuccess, setShowSignUpSuccess] = React.useState(false);

  const notify = useNotifier();
  const intl = useIntl();

  const [createStore, { loading }] = useMutation(storeRegisterMutation, {
    onCompleted: data => {
      if (data.storeCreate.errors.length === 0) {
        setStoreName(data?.storeCreate?.store?.name);
        setRedirectUrl(data?.storeCreate?.store?.domain);
        setTimeout(() => {
          notify({
            status: "success",
            text: intl.formatMessage({ defaultMessage: "Create Successfully" })
          });
          setIsSuccess(true);
          setLoginLoading(false);
        }, 10000);
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

  React.useEffect(() => {
    if (loading && isSuccess === false) {
      setLoginLoading(true);
    }
  }, [loading]);

  const handleSubmit = (data: Partial<any>) => {
    delete data.resetPassword;
    const variables: any = {
      input: {
        ...data
      }
    };
    // setRedirectUrl(`${data.domain}.${END_POINT}`);

    createStore({
      variables
    });
  };

  return (
    <>
      {isSuccess ? (
        <SignUpSuccess redirectUrl={redirectUrl} storeName={storeName} />
      ) : loginLoading ? (
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
