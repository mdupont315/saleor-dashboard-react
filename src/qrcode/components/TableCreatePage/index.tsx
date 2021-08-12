/* eslint-disable local-rules/named-styles */
import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
// import { API_QR } from "@saleor/config";
import { sectionNames } from "@saleor/intl";
import { Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import ReactToPrint from "react-to-print";
import * as Yup from "yup";

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
interface IProps {
  onBack?: any;
  data?: any;
  id?: any;
  onSubmit?: any;
  saveButtonBarState?: any;
}

function TableCreatePage({
  onBack,
  id,
  data,
  onSubmit,
  saveButtonBarState
}: IProps) {
  const intl = useIntl();
  const [url, setUrl] = React.useState("");
  const classes = useStyles();
  const componentRef = React.useRef();
  const validateSchema = Yup.object().shape({
    tableName: Yup.string().required("Required")
  });
  const t = window.location.origin.split(":");
  t.splice(-1, 1);

  const handleSubmit = values => {
    const table = values.tableName.replace(" ", "");
    // setUrl(
    //   `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
    //     ":"
    //   )}/?qr=${table}`
    // );
    onSubmit({
      tableName: values.tableName,
      tableQrCode: `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
        ":"
      )}/?qr=${table}`,
      active: values.active
    });
  };

  const initialValues = data
    ? { tableName: data.tableName, active: data.active }
    : { tableName: "", active: false };

  React.useEffect(() => {
    if (data) {
      setUrl(
        `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
          ":"
        )}/?qr=${id}`
      );
    }
  }, []);

  const compareValues = values =>
    JSON.stringify(values) === JSON.stringify(initialValues);
  //   https://chart.googleapis.com/chart?cht=qr&&chs=400x400chl=
  return (
    <Container>
      <div className={classes.configurationCategory}>
        <div className={classes.configurationLabel}>
          <Typography>
            <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}>
              QR Settings
            </h2>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}>
              Define a QR location name such as table number or kiosk number to
              generate a QR code for your customers to order from.
            </p>
          </Typography>
        </div>
        <div>
          <AppHeader onBack={onBack}>
            <FormattedMessage {...sectionNames.QRcode} />
          </AppHeader>
          {id ? (
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: `QRcode Ordering`,
                description: "page header"
              })}
            />
          ) : (
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: `Create QRcode`,
                description: "page header"
              })}
            />
          )}

          <Card>
            <CardTitle
              title={intl.formatMessage({
                defaultMessage: "QR Settings",
                description: "page header"
              })}
            />
            <CardContent>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validateSchema}
              >
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  handleBlur,
                  // touched,
                  errors
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Table Number"
                      fullWidth
                      name="tableName"
                      onChange={e => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={!!errors?.tableName}
                      helperText={errors?.tableName}
                      value={values.tableName}
                    />
                    <FormSpacer />
                    <ControlledCheckbox
                      checked={values.active}
                      name="active"
                      onChange={handleChange}
                      label="This QR location is active"
                    />
                    <SaveButtonBar
                      state={saveButtonBarState}
                      disabled={compareValues(values)}
                      // onCancel={onBack}
                      onSave={handleSubmit}
                    />
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
          <CardSpacer />
          <Card>
            <CardTitle
              title={intl.formatMessage({
                defaultMessage: "QR Code",
                description: "page header"
              })}
              toolbar={
                <ReactToPrint
                  trigger={() => <Button color="primary">Print</Button>}
                  content={() => componentRef.current}
                />
              }
            />
            {/* <CardHeader title="QR code" action={} /> */}
            <CardContent>
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  border: "1px solid #EAEAEA",
                  borderRadius: "8px",
                  padding: "16px"
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                  src={url}
                  ref={componentRef}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default TableCreatePage;
