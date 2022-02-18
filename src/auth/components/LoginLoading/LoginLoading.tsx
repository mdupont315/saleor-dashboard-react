import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@saleor/theme";
import React from "react";

const useStyles = makeStyles(
  {
    root: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      alignItems: "center",
      display: "flex",
      height: "100vh",
      justifyContent: "center"
    }
  },
  { name: "LoginLoading" }
);
const LoginLoading: React.FC = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress size={128} />
    </div>
  );
};
LoginLoading.displayName = "LoginLoading";
export default LoginLoading;
