import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { commonMessages, sectionNames } from "@saleor/intl";
// import { useUpdateStoreMutation } from "@saleor/stores/queries";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

// import { useGetMyStore } from "../queries";
import DeliveryAreaCard from "./DeliveryAreaCard";
import DeliveryFeeCard from "./DeliveryFeeCard";

const useStyles = makeStyles(
  () => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    grid: {
      marginLeft: 25,
      marginBottom: 15
    }
  }),
  { name: "DeliveryViewPage" }
);

function DeliveryViewPage({ onSubmit, updateEmergencyOpts }) {
  const intl = useIntl();
  const S = useStyles();

  // const { data } = useGetMyStore({ variables: {} });

  // React.useEffect(() => {}, [data]);
  const initialForm = {
    deliveryFee: 0,
    minOrder: 0,
    fromDelivery: 0,
    deliveryArea: [{ to: "", from: "" }]
  };

  const compareWithData = values => {
    if (JSON.stringify(initialForm).length === JSON.stringify(values).length) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <Formik
        initialValues={initialForm}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          handleBlur,
          touched,
          errors
        }) => (
          <Form>
            <PageHeader title={intl.formatMessage(sectionNames.emergency)} />
            <FieldArray
              name="deliveryArea"
              render={arrayHelpers => (
                <>
                  <Card>
                    <CardTitle
                      title={intl.formatMessage(commonMessages.emergency)}
                    />
                    <CardContent>
                      {values.deliveryArea.map((value, index) => (
                        <DeliveryAreaCard
                          key={index}
                          value={value}
                          arrayHelpers={arrayHelpers}
                          index={index}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      ))}
                    </CardContent>
                    <Grid className={S.grid}>
                      <Button
                        href={""}
                        color="primary"
                        variant="contained"
                        target="_blank"
                        onClick={() => arrayHelpers.push({ to: "", from: "" })}
                      >
                        <FormattedMessage
                          defaultMessage="Add delivery Area"
                          description="button"
                        />
                      </Button>
                    </Grid>
                  </Card>
                  <FormSpacer />
                </>
              )}
            />
            <DeliveryFeeCard
              handleChange={handleChange}
              values={values}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
            <SaveButtonBar
              disabled={compareWithData(values)}
              state={updateEmergencyOpts.loading}
              onSave={handleSubmit}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const validateSchema = Yup.object().shape({
  deliveryFee: Yup.string()
    .required("PLease enter delivery fee")
    .matches(/^[0-9]+$/, "Must be only digits"),
  minOrder: Yup.string()
    .required("PLease enter min order")
    .matches(/^[0-9]+$/, "Must be only digits"),
  fromDelivery: Yup.string()
    .required("PLease enter from delivery")
    .matches(/^[0-9]+$/, "Must be only digits"),
  deliveryArea: Yup.array().of(
    Yup.object().shape({
      to: Yup.string().required("Please enter up to"),
      from: Yup.string().required("PLease enter including")
    })
  )
});
export default DeliveryViewPage;
