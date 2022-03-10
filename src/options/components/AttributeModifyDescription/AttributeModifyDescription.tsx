/* eslint-disable local-rules/named-styles */
/* eslint-disable arrow-body-style */
import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  title: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#3d3d3d"
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#3d3d3d"
  }
});

export const ModifierInfomationDescription: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography>
        <h2 className={classes.title}>Modifier Information</h2>
        <p className={classes.subTitle}>
          Give your modifier a name for your customers to know what to choose,
          e.g. “Choose a sauce”
        </p>
      </Typography>
    </>
  );
};

export const ModifierOptionsDescription: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography>
        <h2 className={classes.title}>Modifier Options</h2>
        <p className={classes.subTitle}>
          Here you can add the different options for your customers to choose
          from. You can also add prices for each option if needed.
        </p>
      </Typography>
    </>
  );
};

export const ModifierRulesDescription: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography>
        <h2 className={classes.title}>Modifier Rules</h2>
        <p className={classes.subTitle}>
          By default, your customers are not required to choose anything. You
          can change this by requiring at least 1 option (useful for portion
          sizes, for example) or allowing multiple choices (useful for topping
          choices, for example).
        </p>
      </Typography>
    </>
  );
};
