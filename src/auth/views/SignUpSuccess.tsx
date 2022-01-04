import { Button, Typography } from "@material-ui/core";
import FormSpacer from "@saleor/components/FormSpacer";
import { makeStyles } from "@saleor/theme";
import React from "react";
import ReactSVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

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
    subTitle: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px"
    },
    subTitleBold: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "24px"
    }
  }),
  { name: "LoginCard" }
);

function SignUpSuccess({ redirectUrl, storeName }: any) {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.headerTitle}>
        <FormattedMessage
          defaultMessage="Welcome to Orderich {icon}"
          description="description"
          values={{
            icon: <ReactSVG src="" />
          }}
        />
      </Typography>
      <FormSpacer />
      <Typography className={classes.subTitle}>
        <FormattedMessage
          defaultMessage="Hooray! A free order site has just been set up for {boldText} at {link}"
          description="description"
          values={{
            boldText: (
              <span className={classes.subTitleBold}>
                {`${storeName || ""}`}
              </span>
            ),
            link: (
              <a href={`https://${redirectUrl}`} className={classes.link}>
                {`https://${redirectUrl}`}
              </a>
            )
          }}
        />
      </Typography>
      <FormSpacer />
      <Typography className={classes.subTitle}>
        <FormattedMessage
          defaultMessage="You can now log in with your email and password to continue adding your logo, opening hours, products and so on."
          description="description"
        />
      </Typography>
      <FormSpacer />
      <a
        className={classes.buttonContainer}
        href={`https://${redirectUrl}/dashboard`}
      >
        <Button
          color="primary"
          fullWidth
          variant="contained"
          // onClick={() => history.push(redirectUrl)}
          type="submit"
          data-test="submit"
        >
          <FormattedMessage
            defaultMessage="Back to login"
            description="button"
          />
        </Button>
      </a>
    </>
  );
}

export default SignUpSuccess;
