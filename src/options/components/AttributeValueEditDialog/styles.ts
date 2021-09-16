import { makeStyles } from "@saleor/theme";

export const useStyles = makeStyles(
  theme => ({
    dialogContent: {
      border: 0,
      paddingBottom: 0
    },
    wrapperCard: {
      border: 0
    },
    textContent: {
      margin: 0,
      padding: 0,
      marginTop: "6px",
      fontSize: "14px",
      lineHeight: "20px",
      color: "#3D3D3D"
    },
    card: {
      padding: 0,

      "&:last-child": {
        paddingBottom: 0
      }
    },
    colName: {
      fontSize: 14,
      paddingLeft: 0,
      width: "auto"
    },
    colType: {
      fontSize: 14,
      textAlign: "right",
      width: 235
    },
    info: {
      fontSize: 14
    },
    row: {
      borderBottom: "1px solid #EAEAEA",

      "&:last-child": {
        "& td": {
          borderBottom: "none"
        }
      }
    },
    table: {
      tableLayout: "fixed",
      overflow: "hidden"
    },
    tableContainer: {
      margin: theme.spacing(0, -3),
      width: `calc(100% + ${theme.spacing(6)}px)`
    },
    formControlRoot: {
      paddingBottom: "10px"
    },
    inputLabelRoot: {
      overflow: "hidden"
    },
    dialogAction: {
      padding: "16px 0",
      borderTop: 0
    }
  }),
  {
    name: "SaleValue"
  }
);
