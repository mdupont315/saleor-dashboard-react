/* eslint-disable local-rules/named-styles */
import { Container, makeStyles, Typography } from "@material-ui/core";
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

const useStyles = makeStyles(theme => ({
  configurationCategory: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    borderTop: `solid 1px ${theme.palette.divider}`,
    display: "grid",
    gridColumnGap: theme.spacing(4) + "px",
    gridTemplateColumns: "1fr 3fr",
    paddingTop: theme.spacing(3)
  },
  configurationLabel: {
    paddingBottom: 20
  }
}));

const PaymentViewPage: React.FC<StroreNotification> = ({
  data,
  onSubmit,
  onBack,
  state
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          contantCost: JSON.stringify(data?.contantCost ?? 0),
          contantEnable: data?.contantEnable || false,
          stripeCost: JSON.stringify(data?.stripeCost ?? 0),
          stripeEnable: data?.stripeEnable || false,
          enableTransactionFee: data?.enableTransactionFee || false
        }
      : {
          contantCost: 0,
          contantEnable: false,
          stripeCost: 0,
          stripeEnable: false,
          enableTransactionFee: false
        };

  const compareWithData = values =>
    JSON.stringify(initialForm) === JSON.stringify(values);
  if (data === undefined) {
    return <h2>loadding</h2>;
  }
  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.Payment)} />
      <div className={classes.configurationCategory}>
        <div className={classes.configurationLabel}>
          <Typography>
            <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}>
              Payment Methods
            </h2>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}>
              Determine what payment methods your customers can pay with and,
              optionally, set transaction fees.
            </p>
          </Typography>
        </div>
        <div>
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
        </div>
      </div>
    </Container>
  );
};

const validateSchema = Yup.object().shape({
  contantCost: Yup.number().required("PLease enter contant cost"),
  stripeCost: Yup.number().required("PLease enter stripe cost")
});

export default PaymentViewPage;
