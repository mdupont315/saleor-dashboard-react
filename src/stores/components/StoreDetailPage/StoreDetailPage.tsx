import AppHeader from "@saleor/components/AppHeader";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { sectionNames } from "@saleor/intl";
import { Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import * as yup from "yup";

import StoreInput from "../StoreInput";

interface IProps {
  disabled?: boolean;
  storeId?: string;
  initialValues?: any;
  userData?: any;
  onBack?: () => void;
  onSubmit?: (data: Partial<StoreDetailVariables>) => void;
  saveButtonBarState?: ConfirmButtonTransitionState;
  handleRefetch?: () => void;
}

export function areAddressInputFieldsModified(
  data: StoreDetailVariables
): boolean {
  return ([
    "name",
    "description",
    "storeType",
    "phone",
    "acreage",
    "latlong,"
  ] as Array<keyof StoreDetailVariables>)
    .map(key => data[key])
    .some(field => field !== "");
}

export interface StoreDetailVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name: string;
  description: string;
  storeType: string;
  phone: string;
  phoneCode: string;
  acreage: number;
  latlong: string;
  userName: string;
  country: string;
  city: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettingsPageFormData extends StoreDetailVariables {
  description: string;
  domain: string;
  name: string;
}

// const postCodeCheck = (value: any) => {
//   const result =
//     value.length > 0 && value.length < 8
//       ? isNaN(Number(value.slice(0, 4))) === false &&
//         value.slice(4, 5) === " " &&
//         !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value.slice(5, 7))
//         ? true
//         : false
//       : false;
//   return result;
// };

const endPoint = process.env.END_POINT;

const validateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required!")
    .max(60, "Store name can only contain 60 characters"),
  domain: yup.string().required("Required!"),
  // phone: yup.string().required("Required!"),
  // address: yup.string().required("Required!"),
  email: yup
    .string()
    .required("Required!")
    .email("Invalid Email!"),
  password: yup
    .string()
    .required("Required!")
    .min(8, "Too Short!")
});

const validateSchemaUpdate = yup.object().shape({
  name: yup
    .string()
    .required("Required!")
    .max(60, "Store name can only contain 60 characters"),
  domain: yup.string().required("Required!"),
  phone: yup.string().required("Required!"),
  address: yup.string().required("Required!"),
  postalcode: yup.string().required("Required")
  // .test(
  //   "postalCode",
  //   "Sorry, we do not deliver to this area. Try another postcode or place a pickup delivery instead.",
  //   value => postCodeCheck(value)
  // )
});

const StoreDetailPage: React.FC<IProps> = ({
  initialValues,
  saveButtonBarState,
  storeId,
  onSubmit,
  onBack
}) => {
  const intl = useIntl();

  const initialForm =
    initialValues && initialValues?.store
      ? {
          name: initialValues.store.name,
          domain: initialValues.store.domain.replace(`.${endPoint}`, ""),
          email: initialValues.store.email,
          password: initialValues.store.password,
          logo: [initialValues.store.logo || ""],
          coverPhoto: [initialValues.store.coverPhoto || ""],
          favicon: [initialValues.store.favicon || ""],
          address: initialValues.store.address,
          phone: initialValues.store.phone,
          postalcode: initialValues.store.postalCode,
          city: initialValues.store.city
        }
      : {
          name: "",
          domain: "",
          email: "",
          password: ""
          // logo: [],
          // coverPhoto: [],
          // address: "",
          // phone: ""
        };

  const compareStatus = values => {
    if (initialValues && initialValues?.store) {
      delete initialValues?.store.id;
      delete initialValues?.store.__typename;
      const cloneObject = { ...values };
      const value = Object.assign(cloneObject, {
        logo: initialValues?.store?.logo || "",
        coverPhoto: initialValues?.store?.coverPhoto || "",
        favicon: initialValues?.store?.favicon || ""
      });

      return JSON.stringify(value) === JSON.stringify(initialValues?.store);
    }
    return false;
  };

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.stores)} />
      <Formik
        initialValues={initialForm}
        validationSchema={storeId ? validateSchemaUpdate : validateSchema}
        onSubmit={values => onSubmit(values)}
      >
        {({ values, handleChange, handleSubmit, ...formikProps }) => (
          <>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <StoreInput
                {...formikProps}
                header={intl.formatMessage({
                  defaultMessage: "Store Information",
                  description: "section header"
                })}
                values={values}
                handleChange={handleChange}
                storeId={storeId}
              />
            </form>
            <SaveButtonBar
              state={saveButtonBarState}
              disabled={compareStatus(values)}
              onCancel={onBack}
              onSave={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default StoreDetailPage;
