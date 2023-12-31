import { makeStyles } from "@saleor/theme";

export const useStyles = makeStyles(
  theme => ({
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
    },
    colName: {
      fontSize: 14,
      width: "auto"
    },
    colDomain: {
      fontSize: 14,
      width: "57%"
    },
    colUrl: {
      border: 0,
      borderTop: `solid 1px ${theme.palette.divider}`
    },
    colStatus: {
      border: 0,
      borderTop: `solid 1px ${theme.palette.divider}`
    },
    dotStatusActive: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#FE6D76"
    },
    dotStatus: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#06847B"
    },
    domainStatus: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    table: {
      tableLayout: "fixed"
    },
    tableContainer: {
      margin: theme.spacing(0, -3),
      width: `calc(100% + ${theme.spacing(6)}px)`
    },
    guideTitle: {
      borderBottom: `solid 1px ${theme.palette.divider}`,
      lineHeight: "28px"
    }
  }),
  {
    name: "D:NCCProjectNCCorderichdashboardsrcstorescomponentsStoreInputstyles"
  }
);
