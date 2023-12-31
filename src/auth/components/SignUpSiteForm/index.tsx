import { Button, TextField, Typography } from "@material-ui/core";
import { ignoreSpecialCharacter } from "@saleor/auth";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import useNavigator from "@saleor/hooks/useNavigator";
import { makeStyles } from "@saleor/theme";
import { Formik } from "formik";
import React, { ChangeEvent } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end"
    },
    headerTitle: {
      // marginBottom: "32px",
      color: "#3D3D3D",
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "32px"
    },
    subTitle: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px"
    },
    subInfo: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",

      "& span": {
        color: theme.palette.primary.main,
        cursor: "pointer"
      }
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textDecoration: "underline"
    },
    loading: {
      alignItems: "center",
      display: "flex",
      minHeight: "80vh",
      justifyContent: "center"
    },
    loginButton: {
      // width: 140
    },
    reverse: {
      gridTemplateColumns: "4fr 9fr"
    },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing(),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1.5)
    }
  }),
  { name: "LoginCard" }
);

interface IProps {
  initialForm: any;
  validateSchema: any;
  onSubmit: (values: any) => void;
}

function SignUpSiteForm(props: IProps) {
  const { initialForm, validateSchema, onSubmit } = props;
  const classes = useStyles();
  const intl = useIntl();
  // const domain = process.env.END_POINT;
  const navigate = useNavigator();
  return (
    <div
      style={
        {
          // position: "absolute"
        }
      }
    >
      <Typography className={classes.headerTitle}>
        <FormattedMessage defaultMessage="Let’s create a free order site for your restaurant today" />
      </Typography>

      <FormSpacer />

      <Typography className={classes.subTitle}>
        <FormattedMessage defaultMessage="Tell us a little bit about your restaurant" />
      </Typography>

      <FormSpacer />
      <Formik
        initialValues={initialForm}
        validationSchema={validateSchema}
        onSubmit={values => onSubmit(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          touched,
          setFieldValue
        }) => (
          <>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Restaurant name"
                })}
                fullWidth
                name="name"
                value={values.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange(event);
                  setFieldValue(
                    "domain",
                    ignoreSpecialCharacter(event.target.value)
                  );
                }}
                onBlur={handleBlur}
                error={errors.name && !!touched.name}
                helperText={errors.name && touched.name && errors.name}
              />
              <FormSpacer />
              {values.domain && (
                <Typography className={classes.subInfo}>
                  <FormattedMessage
                    defaultMessage="Your URL will be {link}. You can add your own custom domain name later."
                    values={{
                      link: (
                        <span>{`https://${values.domain}.${process.env.END_POINT}`}</span>
                      )
                    }}
                  />
                </Typography>
              )}
              <FormSpacer />
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Street address"
                })}
                fullWidth
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address && !!touched.address}
                helperText={errors.address && touched.address && errors.address}
              />
              <FormSpacer />
              <Grid className={classes.reverse}>
                <div>
                  <TextField
                    label={intl.formatMessage({
                      defaultMessage: "Postcode"
                    })}
                    fullWidth
                    name="postalCode"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.postalCode && !!touched.postalCode}
                    helperText={
                      errors.postalCode &&
                      touched.postalCode &&
                      errors.postalCode
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
                    error={errors.city && !!touched.city}
                    helperText={errors.city && touched.city && errors.city}
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
                error={errors.phone && !!touched.phone}
                helperText={errors.phone && touched.phone && errors.phone}
              />
              <FormSpacer />
              <Typography className={classes.subTitle}>
                <FormattedMessage defaultMessage="Now let’s set up your login information" />
              </Typography>
              <FormSpacer />
              {/* <TextField
                label={intl.formatMessage({
                  defaultMessage: "Domain*"
                })}
                fullWidth
                name="domain"
                value={values.domain}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.domain && !!touched.domain}
                helperText={errors.domain && touched.domain && errors.domain}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">.{domain}</InputAdornment>
                  )
                }}
              />
              <FormSpacer /> */}
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Email address*"
                })}
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && !!touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
              <FormSpacer />
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Password*"
                })}
                fullWidth
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && !!touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              <FormSpacer />
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Repeat password*"
                })}
                fullWidth
                name="resetPassword"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.resetPassword && !!touched.resetPassword}
                helperText={
                  errors.resetPassword &&
                  touched.resetPassword &&
                  errors.resetPassword
                }
              />
              <FormSpacer />
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.loginButton}
                  color="primary"
                  fullWidth
                  variant="contained"
                  type="submit"
                  data-test="submit"
                >
                  <FormattedMessage
                    defaultMessage="Create my order site"
                    description="button"
                  />
                </Button>
              </div>
              <FormSpacer />
              <Typography className={classes.subTitle}>
                <FormattedMessage
                  defaultMessage="Already using Orderich? {loginLink}"
                  values={{
                    loginLink: (
                      <a className={classes.link} onClick={() => navigate("/")}>
                        <FormattedMessage
                          defaultMessage="Log in"
                          description="link"
                        />
                      </a>
                    )
                  }}
                />
              </Typography>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default SignUpSiteForm;
