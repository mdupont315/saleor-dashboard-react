import {
  Button,
  Card,
  CardContent,
  Container,
  TextField
} from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
// import { API_QR } from "@saleor/config";
import { sectionNames } from "@saleor/intl";
import { Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import ReactToPrint from "react-to-print";
import * as Yup from "yup";

interface IProps {
  onBack?: any;
  data?: any;
  id?: any;
  onSubmit?: any;
}

function TableCreatePage({ onBack, id, data, onSubmit }: IProps) {
  const intl = useIntl();
  const [url, setUrl] = React.useState("");
  const [hasChanged, setHasChanged] = React.useState(false);

  const componentRef = React.useRef();
  const validateSchema = Yup.object().shape({
    tableName: Yup.string().required("Required")
  });
  // console.log(API_QR, "-----------");
  const t = window.location.origin.split(":");
  t.splice(-1, 1);

  const handleSubmit = values => {
    const table = values.tableName.replace(" ", "");
    setUrl(
      `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
        ":"
      )}/?qr=${table}`
    );
    onSubmit({
      tableName: table,
      tableQrCode: `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
        ":"
      )}/?qr=${table}`
    });
  };

  const initialValues = data
    ? { tableName: data.tableName }
    : { tableName: "" };

  React.useEffect(() => {
    if (data) {
      const table = data.tableName.replace(" ", "");

      setUrl(
        `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
          ":"
        )}/?qr=${table}`
      );
    }
  }, []);

  //   https://chart.googleapis.com/chart?cht=qr&&chs=400x400chl=
  return (
    <Container>
      <AppHeader onBack={onBack}>
        <FormattedMessage {...sectionNames.QRcode} />
      </AppHeader>
      {id ? (
        <PageHeader
          title={intl.formatMessage({
            defaultMessage: `QRcode Detail`,
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
            defaultMessage: "Table number",
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
                    if (e.target.value !== initialValues.tableName) {
                      setHasChanged(true);
                    } else {
                      setHasChanged(false);
                    }
                  }}
                  onBlur={handleBlur}
                  error={!!errors?.tableName}
                  helperText={errors?.tableName}
                  value={values.tableName}
                />
                <FormSpacer />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  disabled={!hasChanged}
                >
                  Submit
                </Button>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" color="primary">
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </form>
            )}
          </Formik>

          <FormSpacer />
          <img src={url} ref={componentRef} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default TableCreatePage;
