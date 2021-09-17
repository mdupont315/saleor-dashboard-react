/* eslint-disable local-rules/named-styles */
import { makeStyles } from "@material-ui/core";
import React from "react";
// import "./style.css";

const useStyles = makeStyles({
  orderWrap: {
    // height: "500px",
    width: "100%",
    border: "1px solid #808080",
    borderRadius: "8px",
    padding: "24px",
    color: "#222222"
  },
  listLine: {
    width: "100%",
    margin: "24px 0",
    borderBottom: "1px solid #dcdcdc",
    paddingBottom: "24px",
    color: "#222222"
  },
  rQty: {
    width: "50px",
    textAlign: "right"
  },
  rPrice: {
    textAlign: "right"
  },
  rProduct: {},

  option: {
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: 400,
    color: "#808080"
  },
  discountBox: {},
  discountItem: {
    display: "flex",
    justifyContent: "space-between"
  },
  label: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    padding: 0,
    margin: 0
  },
  price: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    padding: 0,
    margin: "0 0 8px 0"
  }
});

function OrderDetail({ orderDetail }: any) {
  const classes = useStyles();
  return (
    <div className="parrent-container">
      <div className="container">
        <div className={classes.orderWrap}>
          <h3 style={{ padding: 0, margin: 0 }}>Order details</h3>
          <table className={classes.listLine}>
            <tbody>
              {(orderDetail?.lines || []).map((item: any) => {
                const optionItems = JSON.parse(JSON.parse(item?.optionItems));
                if (optionItems.length > 0) {
                  return (
                    <>
                      <tr>
                        <td className={classes.rQty}>{item?.quantity} x</td>
                        <td>
                          <div>
                            <h4 style={{ padding: 0, margin: 0 }}>
                              {item?.productName}
                            </h4>
                          </div>
                        </td>
                        <td className={classes.rPrice}>€ 220,00</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style={{ textAlign: "left" }}>
                          <ul
                            style={{ padding: 0, margin: 0, listStyle: "none" }}
                          >
                            {(optionItems || []).map(
                              (opt: any, index: number) => (
                                <li key={index} className={classes.option}>
                                  {opt.name}
                                </li>
                              )
                            )}
                          </ul>
                        </td>
                        <td></td>
                      </tr>
                    </>
                  );
                }
                return (
                  <>
                    <tr>
                      <td className={classes.rQty}>22 x</td>
                      <td>
                        <div>
                          <h4 style={{ padding: 0, margin: 0 }}>
                            product Name
                          </h4>
                        </div>
                      </td>
                      <td className={classes.rPrice}>€ 220,00</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <div className={classes.discountBox}>
            {orderDetail?.discounts && (
              <div className={classes.discountItem}>
                <p className={classes.label}>Discount</p>
                <p className={classes.price}>
                  - € {orderDetail?.discounts?.amount}
                </p>
              </div>
            )}

            {orderDetail?.deliveryFee > 0 && (
              <div className={classes.discountItem}>
                <p className={classes.label}>Delivery cost</p>
                <p className={classes.price}>€ {orderDetail?.deliveryFee}</p>
              </div>
            )}

            {orderDetail?.transactionCost > 0 && (
              <div className={classes.discountItem}>
                <p className={classes.label}>Transaction cost (iDeal)</p>
                <p className={classes.price}>
                  € {orderDetail?.transactionCost}
                </p>
              </div>
            )}

            <div className={classes.discountItem}>
              <p className={classes.label}>Total</p>
              <p className={classes.price}>
                € {orderDetail?.subtotal?.gross.amount}
              </p>
            </div>

            <div className={classes.discountItem}>
              <p style={{ margin: 0 }}>Paid with iDeal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
