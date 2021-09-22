/* eslint-disable object-shorthand */
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
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
  theme => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    grid: {
      padding: "14px 24px",
      display: "flex",
      justifyContent: "flex-end"
    },
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
    },
    divider: {
      border: "1px solid #EAEAEA",
      marginTop: "-33px",
      borderRadius: "0px"
    },
    textAction: {
      fontSize: "14px",
      lineHeight: "24px",
      textTransform: "uppercase",
      color: "#06847B",
      margin: 0,
      cursor: "pointer"
    }
  }),
  { name: "DeliveryViewPage" }
);

interface IProps {
  data?: any;
  onSubmit?: (input: any) => void;
  onBack?: () => void;
  updateEmergencyOpts?: any;
}

function DeliveryViewPage({
  data,
  onSubmit,
  onBack,
  updateEmergencyOpts
}: IProps) {
  const intl = useIntl();
  const S = useStyles();

  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          id: data.id,
          deliveryFee: data.deliveryFee,
          minOrder: data.minOrder,
          fromDelivery: data.fromDelivery,
          deliveryArea: JSON.parse(data.deliveryArea).areas,
          enableForBigOrder: data.enableForBigOrder
        }
      : {
          deliveryFee: 0,
          minOrder: 0,
          fromDelivery: 0,
          deliveryArea: [{ to: "", from: "" }],
          enableForBigOrder: false
        };

  const compareWithData = values =>
    JSON.stringify(initialForm) === JSON.stringify(values);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <FormSpacer />
      <div>
        {data !== undefined ? (
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
                <PageHeader title={intl.formatMessage(sectionNames.delivery)} />

                <FieldArray
                  name="deliveryArea"
                  render={arrayHelpers => (
                    <>
                      <div className={S.configurationCategory}>
                        <div className={S.configurationLabel}>
                          <Typography>
                            <h2
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                color: "#3d3d3d"
                              }}
                            >
                              Delivery Area By Postcodes
                            </h2>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#3d3d3d"
                              }}
                            >
                              Determine the postcode ranges that you deliver to.
                            </p>
                          </Typography>
                        </div>
                        <div>
                          <Card>
                            <CardTitle
                              title={intl.formatMessage(
                                commonMessages.deliveryArea
                              )}
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
                            <hr className={S.divider} />
                            <Grid className={S.grid}>
                              <Button
                                color="primary"
                                variant="text"
                                onClick={() =>
                                  arrayHelpers.push({ to: "", from: "" })
                                }
                              >
                                <FormattedMessage
                                  defaultMessage=" ADD POSTCODE RANGE"
                                  description=" ADD POSTCODE RANGE button"
                                />
                              </Button>
                            </Grid>
                          </Card>
                        </div>
                      </div>

                      <FormSpacer />
                    </>
                  )}
                />

                <div className={S.configurationCategory}>
                  <div className={S.configurationLabel}>
                    <Typography>
                      <h2
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#3d3d3d"
                        }}
                      >
                        Delivery order Settings
                      </h2>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#3d3d3d"
                        }}
                      >
                        Determine your delivery fee, minimum delivery order
                        value and free delivery threshold.
                      </p>
                    </Typography>
                  </div>
                  <div>
                    <DeliveryFeeCard
                      handleChange={handleChange}
                      values={values}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>

                <SaveButtonBar
                  disabled={compareWithData(values)}
                  state={updateEmergencyOpts.loading}
                  onSave={handleSubmit}
                />
              </Form>
            )}
          </Formik>
        ) : (
          <></>
        )}
      </div>
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
      to: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "The number must be greater than 0!",
          value => value > 0
        )
        .test({
          name: "from",
          exclusive: false,
          params: {},
          message: `Must be more than or equals from value`,
          test: function(value) {
            if (this.parent.from) {
              return value >= this.parent.from;
            }
            return true;
          }
        }),
      from: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "The number must be greater than 0!",
          value => value > 0
        )
    })
  )
});
export default DeliveryViewPage;
