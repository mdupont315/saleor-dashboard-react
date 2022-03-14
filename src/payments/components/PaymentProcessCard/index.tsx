import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import {
  SortableTableBody,
  SortableTableRow
} from "@saleor/components/SortableTable";
import { maybe, renderCollection } from "@saleor/misc";
import { makeStyles } from "@saleor/theme";
import { ReorderEvent } from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    colAction: {
      // width: "50%",
      alignItems: "right"
    },
    colGrab: {
      width: 60
    },
    colName: {
      marginTop: 25,
      width: "30%"
    },
    colSlug: {
      width: 300
    },
    link: {
      cursor: "pointer"
    },
    textLeft: {
      textAlign: "left"
    },
    draggable: {
      width: "5%",
      marginTop: 21,
      marginLeft: 20
    },
    checkbox: {
      marginTop: 13,
      width: "10%"
    },
    table: {
      minWidth: 650
    },
    columnAdmin: {
      width: "100%"
    },
    columnDrag: {
      width: 48 + theme.spacing(1.5)
    },
    columnStore: {
      width: "auto"
    },
    dragIcon: {
      cursor: "grab"
    },
    iconCell: {
      "&:last-child": {
        paddingRight: theme.spacing()
      },
      width: 80
    }
  }),
  { name: "ProductTypeAttributes" }
);

export interface PaymentProcessCard {
  values: any;
  handleChange: any;
  errors: any;
  setFieldValue: any;
}

const ServiceProcessCard: React.FC<PaymentProcessCard> = ({
  values,
  handleChange,
  errors,
  setFieldValue
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const cachedText = [
    {
      text: "indexCash",
      label: "Cash upon receipt",
      cost: "contantCost",
      enable: "contantEnable"
    },
    {
      text: "indexStripe",
      label: "Stripe",
      cost: "stripeCost",
      enable: "stripeEnable"
    }
  ];
  const [text, setText] = React.useState([]);

  React.useEffect(() => {
    const positionPay: any[] = [];

    Object.keys(values).forEach(key => {
      if (key === "indexCash" || key === "indexStripe") {
        positionPay[values[key]] = cachedText.filter(
          (element: any) => element.text === key
        )?.[0];
      }
    });
    setText(positionPay);
  }, []);

  const handleValueReorder = ({ newIndex, oldIndex }: ReorderEvent) => {
    // destructuring assignment
    const cacheArray =
      newIndex > oldIndex
        ? [text[newIndex], text[oldIndex]]
        : [text[oldIndex], text[newIndex]];
    cacheArray.forEach((element, index) => {
      setFieldValue(element.text, index);
    });
    setText(cacheArray);
  };

  return (
    <Card data-test={"product-attributes"}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Payment methods",
          description: "section header"
        })}
      />
      <CardContent>
        <ControlledSwitch
          name="enableTransactionFee"
          label={`Enable transaction fees`}
          checked={values.enableTransactionFee}
          onChange={handleChange}
        />
      </CardContent>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="left" style={{ textAlign: "left" }}>
              Payment method
            </TableCell>
            <TableCell align="right">
              {values.enableTransactionFee && "Transaction fee"}
            </TableCell>
          </TableRow>
        </TableHead>
        <SortableTableBody onSortEnd={handleValueReorder}>
          {renderCollection(
            text,
            (value, valueIndex) => (
              <SortableTableRow
                className={!!value ? classes.link : undefined}
                hover={!!value}
                key={maybe(() => valueIndex)}
                index={valueIndex || 0}
              >
                <TableCell align="left" style={{ width: "80px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      value={values?.[value.enable]}
                      checked={values?.[value.enable] === true}
                      name={value.enable}
                      onChange={handleChange}
                      // disabled={values.enableTransactionFee}
                    />
                  </div>
                </TableCell>
                <TableCell align="left">
                  <p>{value.label}</p>
                </TableCell>
                <TableCell align="right">
                  {values.enableTransactionFee && (
                    <TextField
                      type="number"
                      error={!!errors?.[value.cost]}
                      value={values?.[value.cost]}
                      name={value.cost}
                      onChange={handleChange}
                      helperText={errors?.[value.cost]}
                    />
                  )}
                </TableCell>
              </SortableTableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={2}>
                  <FormattedMessage
                    defaultMessage="No values found"
                    description="No attribute values found"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </Table>
    </Card>
  );
};

export default ServiceProcessCard;
