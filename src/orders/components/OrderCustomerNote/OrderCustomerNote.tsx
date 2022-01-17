import { Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import Hr from "@saleor/components/Hr";
import Skeleton from "@saleor/components/Skeleton";
import { makeStyles } from "@saleor/theme";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface OrderCustomerNoteProps {
  note: string;
  orderDate: string;
  orderTime: string;
}

const useStyles = makeStyles(
  theme => ({
    sectionHeaderTitle: {
      flex: 1,
      fontWeight: 600 as 600,
      lineHeight: 1,
      textTransform: "uppercase",
      marginBottom: theme.spacing(3)
    }
  }),
  { name: "OrderCustomerNote" }
);

export const OrderCustomerNote: React.FC<OrderCustomerNoteProps> = ({
  note,
  orderDate,
  orderTime
}) => {
  const classes = useStyles();
  const intl = useIntl();

  // Show 'Today' if order today
  const renderOrderDate = expectedDate => {
    const today = new Date().toString().slice(0, 15);

    if (expectedDate) {
      expectedDate = expectedDate.includes("Today")
        ? expectedDate.slice(7)
        : expectedDate;

      if (new Date(expectedDate).toString().slice(0, 15) === today) {
        return "Today, " + expectedDate;
      } else {
        return expectedDate;
      }
    }
    return "";
  };

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Order preferences",
          description: "notes about customer, header"
        })}
      />
      <CardContent>
        <div>
          <Typography className={classes.sectionHeaderTitle}>
            <FormattedMessage defaultMessage="Preferred date & time" />
          </Typography>
          <Typography color="textSecondary">
            {renderOrderDate(orderDate)}
            <br />
            {orderTime}
          </Typography>
        </div>
      </CardContent>
      <Hr />

      <CardContent>
        {note === undefined ? (
          <Skeleton />
        ) : note === "" ? (
          <div>
            <Typography className={classes.sectionHeaderTitle}>
              <FormattedMessage defaultMessage="Order Note" />
            </Typography>
            <Typography color="textSecondary">
              No notes from customer
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.sectionHeaderTitle}>
              <FormattedMessage defaultMessage="Order Note" />
            </Typography>
            <Typography>{note}</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default OrderCustomerNote;
