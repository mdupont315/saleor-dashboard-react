/* eslint-disable local-rules/named-styles */
import placeholderImage from "@assets/images/placeholder255x255.png";
import {
  Card,
  CardContent,
  InputAdornment,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import { FormChange } from "@saleor/hooks/useForm";
import React from "react";
import { useIntl } from "react-intl";

import StoreMedia from "../StoreMedia";

const useStyles = makeStyles(theme => ({
  configurationCategorySite: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      paddingBottom: theme.spacing(2)
    },
    display: "grid",
    gridColumnGap: theme.spacing(4) + "px",
    gridTemplateColumns: "1fr 3fr",
    paddingBottom: theme.spacing(4)
  },
  configurationCategoryInformation: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      paddingTop: theme.spacing(0)
    },
    borderTop: `solid 1px ${theme.palette.divider}`,
    display: "grid",
    gridColumnGap: theme.spacing(4) + "px",
    gridTemplateColumns: "1fr 3fr",
    paddingTop: theme.spacing(4)
  },
  configurationLabel: {
    paddingBottom: 20
  },
  reverse: {
    gridTemplateColumns: "4fr 9fr"
  }
}));

interface IProps {
  header: string;
  handleChange: FormChange;
  values: Partial<any>;
  storeId?: any;
}

function StoreInput({
  header,
  values,
  handleChange,
  storeId,
  ...formikProps
}: IProps) {
  const intl = useIntl();
  const classes = useStyles();
  const { errors, touched, handleBlur, setFieldValue }: any = formikProps;
  const endPoint = process.env.END_POINT;

  const [imagesToUpload, setImagesToUpload] = React.useState<any>({
    logo: [],
    coverPhoto: [],
    favicon: []
  });

  // React.useEffect(() => {
  //   if (values.name) {
  //     console.log(values, "--balue");

  //     setImagesToUpload({
  //       logo: [values.logo],
  //       coverPhoto: [values.coverPhoto]
  //     });
  //   }
  // }, [values]);

  const [tempImgDelete, setTempImgDelete] = React.useState({
    logo: [],
    coverPhoto: [],
    favicon: []
  });

  const handleImageDelete = (id?: string, title?: string) => () => {
    if (title === "Logo") {
      tempImgDelete.logo.push(id);
      setTempImgDelete({ ...tempImgDelete });
      const index = imagesToUpload.logo.findIndex(e => e.id === id);
      if (index !== -1) {
        imagesToUpload.logo.splice(index, 1);
        setImagesToUpload({ ...imagesToUpload });
      }
    } else if (title === "Cover Photo") {
      tempImgDelete.coverPhoto.push(id);
      setTempImgDelete({ ...tempImgDelete });
      const index = imagesToUpload.coverPhoto.findIndex(e => e.id === id);
      if (index !== -1) {
        imagesToUpload.coverPhoto.splice(index, 1);
        setImagesToUpload({ ...imagesToUpload });
      }
    } else {
      tempImgDelete.favicon.push(id);
      setTempImgDelete({ ...tempImgDelete });
      const index = imagesToUpload.favicon.findIndex(e => e.id === id);
      if (index !== -1) {
        imagesToUpload.favicon.splice(index, 1);
        setImagesToUpload({ ...imagesToUpload });
      }
    }
  };

  React.useEffect(() => {
    if (storeId) {
      if (imagesToUpload.logo.length > 0) {
        setFieldValue("logo", imagesToUpload?.logo);
      }
      if (imagesToUpload.coverPhoto.length > 0) {
        setFieldValue("coverPhoto", imagesToUpload?.coverPhoto);
      }
      if (imagesToUpload.favicon.length > 0) {
        setFieldValue("favicon", imagesToUpload?.favicon);
      }
    }
  }, [imagesToUpload]);

  return (
    <>
      <div>
        <div className={classes.configurationCategorySite}>
          <div className={classes.configurationLabel}>
            <Typography>
              <h2
                style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}
              >
                Site Settings
              </h2>
              <p
                style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}
              >
                These are general settings for your store. They define how your
                customers can access it.
              </p>
            </Typography>
          </div>
          <div>
            <Card>
              <CardTitle title="Site Settings" />
              <CardContent>
                <p
                  style={{
                    fontSize: "14px",
                    margin: "0 0 3px 0"
                  }}
                >
                  Your store URL
                </p>
                <a
                  href={`https://${values.domain}.${endPoint}`}
                  style={{
                    color: "#06847B",
                    fontSize: "15px",
                    textDecoration: "none"
                  }}
                >{`https://${values.domain}.${endPoint}`}</a>
                <FormSpacer />
                <TextField
                  label={intl.formatMessage({
                    defaultMessage: "Custom domain name"
                  })}
                  fullWidth
                  name="domain"
                  value={values.domain}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.domain && touched.domain}
                  helperText={errors.domain && touched.domain && errors.domain}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        .{endPoint}
                      </InputAdornment>
                    )
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className={classes.configurationCategoryInformation}>
          <div className={classes.configurationLabel}>
            <Typography>
              <h2
                style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}
              >
                Store Information
              </h2>
              <p
                style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}
              >
                These define what your customers see when they access your
                store.
              </p>
            </Typography>
          </div>
          <div>
            <Card>
              <CardTitle title={header} />
              <CardContent>
                <>
                  <TextField
                    label={intl.formatMessage({
                      defaultMessage: "Store name"
                    })}
                    fullWidth
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name && errors.name}
                  />
                  <FormSpacer />

                  <FormSpacer />
                  {storeId ? (
                    <>
                      <TextField
                        label={intl.formatMessage({
                          defaultMessage: "Address"
                        })}
                        fullWidth
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.address && touched.address}
                        helperText={
                          errors.address && touched.address && errors.address
                        }
                      />
                      <FormSpacer />
                      <Grid className={classes.reverse}>
                        <div>
                          <TextField
                            label={intl.formatMessage({
                              defaultMessage: "Postcode"
                            })}
                            fullWidth
                            name="postalcode"
                            value={values.postalcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.postalcode && touched.postalcode}
                            helperText={
                              errors.postalcode &&
                              touched.postalcode &&
                              errors.postalcode
                            }
                          />
                        </div>
                        <div>
                          <TextField
                            label={intl.formatMessage({
                              defaultMessage: "City"
                            })}
                            fullWidth
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.city && touched.city}
                            helperText={
                              errors.city && touched.city && errors.city
                            }
                          />
                        </div>
                      </Grid>
                      <FormSpacer />
                      <TextField
                        label={intl.formatMessage({
                          defaultMessage: "Phone number"
                        })}
                        fullWidth
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone && touched.phone}
                        helperText={
                          errors.phone && touched.phone && errors.phone
                        }
                      />
                      <FormSpacer />
                    </>
                  ) : (
                    <>
                      <TextField
                        label={intl.formatMessage({
                          defaultMessage: "Email*"
                        })}
                        fullWidth
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                      <FormSpacer />

                      <TextField
                        label={intl.formatMessage({
                          defaultMessage: "password*"
                        })}
                        fullWidth
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password && touched.password}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                      />
                    </>
                  )}

                  <FormSpacer />
                  <FormSpacer />
                </>
              </CardContent>
            </Card>

            {storeId && (
              <>
                <StoreMedia
                  title="Logo"
                  placeholderImage={placeholderImage}
                  imagesToUpload={values.logo}
                  setImagesToUpload={setImagesToUpload}
                  carousel={values.logo}
                  onImageDelete={handleImageDelete}
                />
                <StoreMedia
                  title="Cover Photo"
                  placeholderImage={placeholderImage}
                  imagesToUpload={values.coverPhoto}
                  setImagesToUpload={setImagesToUpload}
                  carousel={values.coverPhoto}
                  onImageDelete={handleImageDelete}
                />
                <StoreMedia
                  title="Favicon"
                  placeholderImage={placeholderImage}
                  imagesToUpload={values.favicon}
                  setImagesToUpload={setImagesToUpload}
                  carousel={values.favicon}
                  onImageDelete={handleImageDelete}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreInput;
