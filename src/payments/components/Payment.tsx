import { Container } from "@material-ui/core";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { sectionNames } from "@saleor/intl";
import { Form, Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";

import PayemntProcessCard from "./PaymentProcessCard";

export interface StroreNotification {
  data: any;
  onSubmit: (input: any) => void;
  onBack: () => void;
  disable: any;
  state: any;
}

const PaymentViewPage: React.FC<StroreNotification> = ({
  data,
  onSubmit,
  onBack,
  state
}) => {
  const intl = useIntl();

  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          contantCost: JSON.stringify(data?.contantCost ?? 0),
          contantEnable: data?.contantEnable ?? false,
          stripeCost: JSON.stringify(data?.stripeCost ?? 0),
          stripeEnable: data?.stripeEnable ?? false
        }
      : {
          contantCost: 0,
          contantEnable: false,
          stripeCost: 0,
          stripeEnable: false
        };

  const compareWithData = values =>
    JSON.stringify(initialForm) === JSON.stringify(values);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.Payment)} />
      <Grid>
        <div>
          {data !== undefined ? (
            <Formik
              initialValues={initialForm}
              onSubmit={onSubmit}
              validationSchema={validateSchema}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <Form>
                  <PayemntProcessCard
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                  />
                  <SaveButtonBar
                    disabled={compareWithData(values)}
                    state={state}
                    onCancel={onBack}
                    onSave={handleSubmit}
                  />
                </Form>
              )}
            </Formik>
          ) : (
            <></>
          )}
        </div>
      </Grid>
    </Container>
  );
};

const validateSchema = Yup.object().shape({
  contantCost: Yup.string()
    .required("PLease enter contant cost")
    .matches(/^[0-9]+$/, "Must be only digits"),
  stripeCost: Yup.string()
    .required("PLease enter stripe cost")
    .matches(/^[0-9]+$/, "Must be only digits")
});

export default PaymentViewPage;
