/* eslint-disable local-rules/named-styles */
import orderichLogo from "@assets/images/orderich-logo.svg";
import placeholderImage from "@assets/images/placeholder60x60.png";
import {
  Button,
  Card,
  CardContent,
  Container,
  DialogContentText,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { useGetMyStore } from "@saleor/emergency/queries";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { TypedBulkRemoveTables } from "@saleor/qrcode/queries";
import { Formik } from "formik";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";
import ReactToPrint from "react-to-print";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  configurationCategory: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    // borderTop: `solid 1px ${theme.palette.divider}`,
    display: "grid",
    gridColumnGap: theme.spacing(4) + "px",
    gridTemplateColumns: "1fr 3fr"
    // paddingTop: theme.spacing(3)
  },
  configurationLabel: {
    paddingBottom: 20
  },

  printWrap: {
    background: "#ffd668 ",
    // padding: "24px 48px",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  logoBox: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    marginBottom: "16px"
  },
  logoStore: {
    width: "100%",
    height: "100%"
  },
  bigText: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "28px",
    color: "#1F1F1F",
    padding: 0,
    margin: "0 0 8px 0",
    textAlign: "center"
  },
  subText: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "#1F1F1F",
    padding: 0,
    margin: "0 0 16px 0",
    textAlign: "center"
  },
  qrImg: {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
    overflow: "hidden"
    // padding: "24px"
  },
  qr: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  orderichFooter: {
    display: "flex",
    alignItems: "center"
  },
  logoFooter: {
    width: "43px"
  },
  textFooter: {
    fontSize: "10px",
    fontWeight: 400,
    lineHeight: "12px",
    marginRight: "4px"
  }
}));
interface IProps {
  onBack?: any;
  data?: any;
  id?: any;
  params?: any;
  onSubmit?: any;
  saveButtonBarState?: any;
  onCloseModal?: any;
}

function TableCreatePage({
  onBack,
  id,
  data,
  onSubmit,
  saveButtonBarState
}: IProps) {
  const intl = useIntl();
  const [url, setUrl] = React.useState(placeholderImage);
  const classes = useStyles();
  const componentRef = React.useRef();
  const validateSchema = Yup.object().shape({
    tableName: Yup.string().required("Required")
  });
  const notify = useNotifier();

  const { data: curStore } = useGetMyStore({ variables: {} });

  const handleSubmit = values => {
    const table = values.tableName.replace(" ", "");
    // setUrl(
    //   `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
    //     ":"
    //   )}/?qr=${table}`
    // );
    onSubmit({
      tableName: values.tableName,
      tableQrCode: `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${window.location.origin}/?qr=${table}`,
      active: values.active
    });
  };

  const initialValues = data
    ? { tableName: data.tableName, active: data.active }
    : { tableName: "", active: true };

  React.useEffect(() => {
    if (data) {
      setUrl(
        `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${window.location.origin}/?qr=${id}`
      );
    }
  }, []);

  const handleBulkDelete = data => {
    if (data.tableServiceBulkDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      onBack();
    }
  };
  const [openDialog, setOpenDialog] = React.useState(false);
  const compareValues = values =>
    JSON.stringify(values) === JSON.stringify(initialValues);
  //   https://chart.googleapis.com/chart?cht=qr&&chs=400x400chl=
  return (
    <>
      <TypedBulkRemoveTables onCompleted={handleBulkDelete}>
        {(bulkDeteleTables, bulkDeleteTableOpts) => (
          <Container>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: `QR Location`,
                description: "page header"
              })}
            />
            <div className={classes.configurationCategory}>
              <div className={classes.configurationLabel}>
                <Typography>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#3d3d3d"
                    }}
                  >
                    QR Settings
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#3d3d3d"
                    }}
                  >
                    Define a QR location name such as table number or kiosk
                    number to generate a QR code for your customers to order
                    from.
                  </p>
                </Typography>
              </div>
              <div>
                <AppHeader onBack={onBack}>QR ORDERING</AppHeader>
                {/* {id ? (
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
                )} */}

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
                          <ControlledSwitch
                            name="active"
                            checked={values.active}
                            label="Enable this QR location"
                            onChange={handleChange}
                          />
                          <FormSpacer />
                          {values.active && (
                            <TextField
                              label="QR location name"
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
                          )}

                          {id ? (
                            <SaveButtonBar
                              state={saveButtonBarState}
                              disabled={compareValues(values)}
                              onCancel={onBack}
                              onDelete={() => {
                                setOpenDialog(true);
                              }}
                              onSave={handleSubmit}
                            />
                          ) : (
                            <SaveButtonBar
                              state={saveButtonBarState}
                              disabled={compareValues(values)}
                              onCancel={onBack}
                              onSave={handleSubmit}
                            />
                          )}
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
                      description: "page l"
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
                        maxWidth: "400px",
                        maxHeight: "400px",
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
                      />
                    </div>

                    {/* print wwrapp   */}

                    <div style={{ display: "none" }}>
                      <div className={classes.printWrap} ref={componentRef}>
                        <div
                          style={{
                            width: "200px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <div className={classes.logoBox}>
                            <img
                              src={
                                curStore?.myStore?.logo?.url || placeholderImage
                              }
                              className={classes.logoStore}
                              alt=""
                            />
                          </div>
                          <p className={classes.bigText}>MENUKAART</p>
                          <p className={classes.subText}>
                            Scan deze QR-code om contactloos te bestellen
                          </p>
                          <div className={classes.qrImg}>
                            <img src={url} alt="" className={classes.qr} />
                          </div>
                          <div className={classes.orderichFooter}>
                            <p className={classes.textFooter}>powered by </p>{" "}
                            <SVG
                              className={classes.logoFooter}
                              src={orderichLogo}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </CardContent>
                </Card>
              </div>
            </div>

            <ActionDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              confirmButtonState={bulkDeleteTableOpts.status}
              onConfirm={() => {
                bulkDeteleTables({
                  variables: {
                    ids: [id]
                  }
                });
              }}
              variant="delete"
              title={intl.formatMessage({
                defaultMessage: "Delete QR location",
                description: "dialog header"
              })}
            >
              <DialogContentText>
                <FormattedMessage defaultMessage="Are you sure you want to delete" />
              </DialogContentText>
            </ActionDialog>
          </Container>
        )}
      </TypedBulkRemoveTables>
    </>
  );
}

export default TableCreatePage;
