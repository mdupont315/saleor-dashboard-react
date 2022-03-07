import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
// import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { sectionNames } from "@saleor/intl";
import { Form, Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";

import NotificationProcessCard from "./NotificationProcessCard";
import ServiceProcessPrint from "./NotificationProcessPrint";

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
      gridTemplateColumns: "1.3fr 3fr",
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
  { name: "NotificationViewPage" }
);

export interface InitialFormNotification {
  soundNotifications: boolean | null;
  emailNotifications: boolean | null;
  emailAddress: string | null;
  posEnable: boolean | null;
  // __typename: "Store";
}

export interface StroreNotification {
  data: InitialFormNotification | null;
  onSubmit: (input: any) => void;
  onBack: () => void;
  disable: any;
  state: any;
}

const NotificationViewPage: React.FC<StroreNotification> = ({
  data,
  onSubmit,
  onBack,
  state
}: any) => {
  const intl = useIntl();
  const S = useStyles();

  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          soundNotifications: data?.soundNotifications ?? false,
          emailNotifications: data?.emailNotifications ?? false,
          emailAddress: data?.emailAddress ?? "",
          posEnable: data?.posEnable ?? false
        }
      : {
          soundNotifications: false,
          emailNotifications: false,
          emailAddress: "",
          posEnable: false
        };

  const compareWithData = values =>
    JSON.stringify(initialForm) === JSON.stringify(values);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.Notification)} />
      <Grid>
        <div>
          {data !== undefined ? (
            <Formik
              initialValues={initialForm}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors
              }) => (
                <Form>
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
                          Notification Settings
                        </h2>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#3d3d3d"
                          }}
                        >
                          Determine how you wish to be notified about new orders
                        </p>
                      </Typography>
                    </div>
                    <div>
                      <NotificationProcessCard
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    </div>
                  </div>

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
                          Automatic Order Receipt Printing
                        </h2>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#3d3d3d"
                          }}
                        >
                          In order to have your order receipts printed out
                          automatically, make sure you have a working printer
                          connected and installed on your device.
                        </p>
                      </Typography>
                    </div>
                    <div>
                      <ServiceProcessPrint
                        values={values}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
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

const validationSchema = Yup.object().shape({
  emailAddress: Yup.string().email("Invalid email")
});

NotificationViewPage.displayName = "NotificationViewPage";
export default NotificationViewPage;
