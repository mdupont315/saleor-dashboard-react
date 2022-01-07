/* eslint-disable local-rules/named-styles */
import placeholderImage from "@assets/images/placeholder255x255.png";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // InputAdornment,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import { FormChange } from "@saleor/hooks/useForm";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

// import EditUrlDialog from "../StoreEditUrlDialog";
import StoreMedia from "../StoreMedia";
import { useStyles } from "./styles";

interface IProps {
  header: string;
  handleChange: FormChange;
  values: Partial<any>;
  storeId?: any;
  onDialogAddDomain?: any;
  closeModal?: any;
}

const fakeDomainList = [
  { url: "peak-holo.orderich.online", status: "Active" },
  { url: "order.nooki.nl", status: "DNS not configured" },
  { url: "nooki-togo.nl", status: "Active" }
];

function StoreInput({
  header,
  values,
  handleChange,
  storeId,
  onDialogAddDomain,
  closeModal,
  ...formikProps
}: IProps) {
  const intl = useIntl();
  const classes = useStyles();
  const { errors, touched, handleBlur, setFieldValue }: any = formikProps;
  // const numberOfColumns = 2;
  // const endPoint = process.env.END_POINT;

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

  const [canCustomDomain, setCanCustomDomain] = React.useState(false);

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

  const handleDeleteSubDomain = () => {
    alert("Delete sub domain");
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
              <CardTitle title="Your URL" />
              <CardContent>
                <div>
                  <p>
                    Below is your URL that we generated for you the moment you
                    signed up. You can let your customers access and place
                    orders through this. Alternatively, you can also add your
                    custom (sub)domains below.
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "0 0 3px 0"
                    }}
                  >
                    Your generated URL
                  </p>
                  <a
                    href={`https://${values.domain}`}
                    style={{
                      color: "#06847B",
                      textDecoration: "none"
                    }}
                  >{`https://${values.domain}`}</a>
                  <FormSpacer />

                  <ControlledSwitch
                    name="e_custom-domain"
                    label={`Use custom domain`}
                    checked={canCustomDomain}
                    onChange={() => setCanCustomDomain(!canCustomDomain)}
                  />
                </div>

                {canCustomDomain && (
                  <>
                    <p>
                      Below you can connect (sub)domains that you own for your
                      customers to access it easier.
                    </p>
                    <FormSpacer />

                    <div className={classes.tableContainer}>
                      <ResponsiveTable className={classes.table}>
                        <TableHead>
                          <TableCell className={classes.colName}>
                            <span>
                              <FormattedMessage
                                defaultMessage="Domain name"
                                description="column title"
                              />
                            </span>
                          </TableCell>
                          <TableCell className={classes.colName}>
                            <div>
                              <span>Status</span>
                            </div>
                          </TableCell>
                        </TableHead>
                        <TableBody>
                          {fakeDomainList &&
                            fakeDomainList.length > 0 &&
                            fakeDomainList.map(domain => (
                              <TableRow key={domain.url}>
                                <TableCell className={classes.colUrl}>
                                  <div style={{ alignSelf: "center" }}>
                                    <a
                                      href={`https://${domain.url}`}
                                      style={{
                                        color: "#06847B",
                                        fontSize: "15px",
                                        textDecoration: "none"
                                      }}
                                    >{`https://${domain.url}`}</a>
                                  </div>
                                </TableCell>
                                <TableCell className={classes.colStatus}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between"
                                    }}
                                  >
                                    <span>{domain.status}</span>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        height: "95%"
                                      }}
                                    >
                                      <Tooltip title="Delete">
                                        <IconButton
                                          aria-label="delete"
                                          onClick={() =>
                                            handleDeleteSubDomain()
                                          }
                                          style={{ color: "#06847B" }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </ResponsiveTable>
                    </div>

                    <FormSpacer />

                    <FormSpacer />

                    <div>
                      <p className={classes.guideTitle}>
                        How to connect your (sub)domain to Orderich
                      </p>

                      <ol style={{ listStyle: "decimal", lineHeight: "24px" }}>
                        <li>
                          On your domain provider’s website, log in to your
                          account.
                        </li>
                        <li>
                          Find the DNS settings or domain management area.
                        </li>
                        <li>
                          Point the A record of your (sub)domain to this IP
                          address 52.58.195.234.
                          <ol style={{ listStyle: "lower-alpha" }}>
                            <li>
                              If you’re connecting a domain name, change the
                              Host name to the @ symbol
                            </li>
                            <li>
                              If you’re connecting a subdomain, change the Host
                              name to the subdomain name (e.g. order, bestellen)
                            </li>
                            <li>
                              Delete any other duplicate A records with the same
                              Host names if there are any present.
                            </li>
                          </ol>
                        </li>
                        <li>
                          Click the Verify Connection button below when you’re
                          done. Note that it might take up to a few hours for
                          the DNS changes to take effect.
                        </li>
                      </ol>
                      <div>
                        <Button color="primary" variant="text">
                          <FormattedMessage
                            defaultMessage="Verify Connection"
                            description="Verify Connection"
                          />
                        </Button>
                      </div>
                    </div>

                    <FormSpacer />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "14px 24px"
                      }}
                    >
                      <Button
                        color="primary"
                        variant="text"
                        onClick={onDialogAddDomain}
                      >
                        <FormattedMessage
                          defaultMessage="Add (Sub)Domain"
                          description="Edit URL"
                        />
                      </Button>
                    </div>
                  </>
                )}

                {/* <EditUrlDialog
                  confirmButtonState="default"
                  // field={selectedConfig?.configuration.find(
                  //   field => field.name === params.id
                  // )}
                  onClose={closeModal}
                  // onConfirm={formData => handleFieldUpdate(formData.value)}
                  open={null}
                /> */}

                {/* <TextField
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
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       .{endPoint}
                  //     </InputAdornment>
                  //   )
                  // }}
                /> */}
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
                      <TextField
                        label={intl.formatMessage({
                          defaultMessage: "Description"
                        })}
                        fullWidth
                        name="description"
                        multiline
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.description && touched.description}
                        helperText={
                          errors.description &&
                          touched.description &&
                          errors.description
                        }
                      />
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
