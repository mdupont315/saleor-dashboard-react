import { TableCell, TableRow } from "@material-ui/core";
import Money from "@saleor/components/Money";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import { maybe } from "@saleor/misc";
import {
  OrderDetails_order_fulfillments_lines,
  OrderDetails_order_lines
} from "@saleor/orders/types/OrderDetails";
import { makeStyles } from "@saleor/theme";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    clickableRow: {
      cursor: "pointer"
    },
    colName: {
      width: "auto",
      fontSize: "15px"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right",
      width: 120
    },
    colQuantity: {
      textAlign: "center",
      width: 120
    },
    colSku: {
      textAlign: "right",
      textOverflow: "ellipsis",
      width: 120
    },
    colTotal: {
      textAlign: "right",
      width: 120
    },
    infoLabel: {
      display: "inline-block"
    },
    infoLabelWithMargin: {
      marginBottom: theme.spacing()
    },
    infoRow: {
      padding: theme.spacing(2, 3)
    },
    orderNumber: {
      display: "inline",
      marginLeft: theme.spacing(1)
    },
    statusBar: {
      paddingTop: 0
    },
    table: {
      tableLayout: "fixed"
    },
    option: {
      display: "block",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      color: "#28234A99"
    }
  }),
  { name: "TableLine" }
);

interface TableLineProps {
  line: OrderDetails_order_fulfillments_lines | OrderDetails_order_lines;
  isOrderLine?: boolean;
  linesFullFill?: any;
}

const TableLine: React.FC<TableLineProps> = ({
  line: lineData,
  linesFullFill,
  isOrderLine = false
}) => {
  const classes = useStyles({});
  const { quantity, quantityFulfilled } = lineData as OrderDetails_order_lines;

  if (!lineData) {
    return <Skeleton />;
  }

  const line = isOrderLine
    ? ({
        ...lineData,
        orderLine: lineData
      } as OrderDetails_order_fulfillments_lines)
    : (lineData as OrderDetails_order_fulfillments_lines);

  const quantityToDisplay = isOrderLine
    ? quantity - quantityFulfilled
    : quantity;

  const productOptions =
    linesFullFill && JSON.parse(JSON.parse(linesFullFill.optionItems));

  return (
    <TableRow className={classes.clickableRow} hover key={line.id}>
      <TableCellAvatar
        className={classes.colName}
        thumbnail={maybe(() => line.orderLine.thumbnail.url)}
      >
        {line.orderLine.productName ? (
          <div>
            <p>{maybe(() => line.orderLine.productName)}</p>
            {productOptions &&
              productOptions.map((item: any) => (
                <span className={classes.option} key={item.id}>
                  {item.name}
                </span>
              ))}
          </div>
        ) : (
          <Skeleton />
        )}
      </TableCellAvatar>
      <TableCell className={classes.colSku}>
        {line?.orderLine.productSku || <Skeleton />}
      </TableCell>
      <TableCell className={classes.colQuantity}>
        {quantityToDisplay || <Skeleton />}
      </TableCell>
      <TableCell className={classes.colPrice}>
        {maybe(() => line.orderLine.unitPrice.gross) ? (
          <Money money={line.orderLine.unitPrice.gross} />
        ) : (
          <Skeleton />
        )}
      </TableCell>
      <TableCell className={classes.colTotal}>
        <Money
          money={{
            amount: line.quantity * line.orderLine.unitPrice.gross.amount,
            currency: line.orderLine.unitPrice.gross.currency
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableLine;
