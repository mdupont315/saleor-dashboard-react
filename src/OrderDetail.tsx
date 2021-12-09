/* eslint-disable local-rules/named-styles */
import placeholderImage from "@assets/images/placeholder60x60.png";
import { makeStyles } from "@material-ui/core";
import React from "react";

// import "./style.css";

const useStyles = makeStyles({
  orderWrap: {
    // height: "500px",
    width: "100%",
    // border: "1px solid #808080",
    // borderRadius: "8px",
    // padding: "24px",
    color: "#222222",
    marginTop: "8px"
  },
  listLine: {
    width: "100%",
    // margin: "24px 0",
    // borderBottom: "1px dotted #000",
    // borderWidth: "3px",
    paddingBottom: "16px",
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
  discountBox: {
    width: "100%"
  },
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
  },
  storeWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
    marginBottom: "16px",
    borderBottom: "1px dotted #000",
    borderWidth: "3px"
  },
  imgBox: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    overflow: "hidden"
  },
  normalText: {
    fontFamily: "monospace",
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center",
    margin: 0
  },
  orderInfomation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
    marginBottom: "16px",
    borderBottom: "1px dotted #000",
    borderWidth: "3px"
  },
  orderTypeWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
    marginBottom: "16px",
    borderBottom: "1px dotted #000",
    borderWidth: "3px"
  },
  mb16: {
    marginBottom: "16px"
  }
});

function OrderDetail({ orderDetail, myStore }: any) {
  const classes = useStyles();
  const {
    billingAddress,
    orderType,
    tableName,
    expectedDate,
    expectedTime,
    payments,
    customerNote,
    number
  } = orderDetail || {};
  const {
    firstName,
    lastName,
    company,
    email,
    phone,
    city,
    streetAddress1,
    postalCode
  } = billingAddress || {};
  const receiver =
    orderType === "PICKUP"
      ? {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          company
        }
      : {
          name: `${firstName} ${lastName}`,
          streetAddress1,
          postalCode: `${postalCode}, ${city}`,
          email,
          phone,
          company
        };
  const getPrice = (input: any) => {
    if (input) {
      return input?.gross.amount;
    }
    return 0;
  };

  // console.log(orderDetail);

  const padLeadingZeros = (num, size) => {
    let s = `${num}`;
    while (s.length < size) {
      s = `0${s}`;
    }
    return s;
  };

  const getDateTime = () => {
    const today = new Date();
    const date = today.toDateString();
    const hours = padLeadingZeros(today.getHours(), 2);
    const minute = padLeadingZeros(today.getMinutes(), 2);
    const result = `${date} ${hours}:${minute}`;
    return result;
  };

  return (
    <div
      className="parrent-container"
      style={{
        width: "80%",
        height: "100%"
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%"
          // width: "184px"
        }}
      >
        <div className={classes.orderWrap}>
          {/* store info */}
          <div className={classes.storeWrap}>
            {myStore && myStore?.myStore?.logo?.url && (
              <div className={classes.imgBox}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                  src={myStore?.myStore?.logo?.url || placeholderImage}
                  alt=""
                />
              </div>
            )}

            <p className={classes.normalText} style={{ margin: 0 }}>
              {myStore?.myStore?.name || ""}
            </p>
            <p className={classes.normalText} style={{ margin: 0 }}>
              {myStore?.myStore?.address || ""}
            </p>
            <p className={classes.normalText} style={{ margin: 0 }}>
              {myStore?.myStore?.postalCode || ""},{" "}
              {myStore?.myStore?.city || ""}
            </p>
            <p className={classes.normalText} style={{ margin: 0 }}>
              {myStore?.myStore?.phone || ""}
            </p>
          </div>
          {/* ordertype wrap */}
          {tableName ? (
            <div className={classes.orderTypeWrap}>
              <p
                className={classes.normalText}
                style={{
                  margin: "0",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textTransform: "uppercase"
                }}
              >
                {tableName}
              </p>
            </div>
          ) : (
            <div className={classes.orderTypeWrap}>
              <p
                className={classes.normalText}
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textTransform: "uppercase"
                }}
              >
                {`${orderType} ${number}`}
              </p>
              <div className={classes.mb16}>
                <p
                  className={classes.normalText}
                  style={{
                    margin: "0 0 8px 0",
                    textTransform: "uppercase",
                    textDecoration: "underline"
                  }}
                >
                  {orderType} MOMENT
                </p>
                <p
                  className={classes.normalText}
                  style={{
                    margin: "0"
                  }}
                >
                  {expectedDate}
                </p>
                <p
                  className={classes.normalText}
                  style={{
                    margin: "0"
                  }}
                >
                  {expectedTime}
                </p>
              </div>
              <div className={classes.mb16}>
                <p
                  className={classes.normalText}
                  style={{
                    margin: "0 0 8px 0",
                    textTransform: "uppercase",
                    textDecoration: "underline"
                  }}
                >
                  RECEIVER
                </p>
                {Object.keys(receiver)
                  .filter((item: any) => receiver[item])
                  .map((item: any, index: number) => (
                    <p
                      className={classes.normalText}
                      style={{
                        margin: "0"
                      }}
                      key={index}
                    >
                      {receiver[item]}
                    </p>
                  ))}
              </div>
              {customerNote && (
                <div>
                  <p
                    className={classes.normalText}
                    style={{
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      textDecoration: "underline"
                    }}
                  >
                    ORDER NOTE
                  </p>
                  <p
                    className={classes.normalText}
                    style={{
                      margin: "0"
                    }}
                  >
                    {customerNote}
                  </p>
                </div>
              )}
            </div>
          )}
          {/* ----order info */}
          <div className={classes.orderInfomation}>
            <p
              className={classes.normalText}
              style={{
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                textDecoration: "underline"
              }}
            >
              ORDER DETAILS
            </p>
            <table className={classes.listLine}>
              <tbody>
                {(orderDetail?.lines || []).map((item: any) => {
                  const optionItems = JSON.parse(JSON.parse(item?.optionItems));
                  if (optionItems && optionItems.length > 0) {
                    return (
                      <>
                        <tr>
                          <td
                            className={classes.normalText}
                            style={{ textAlign: "left" }}
                          >
                            {item?.quantity} x
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <div>
                              <p
                                className={classes.normalText}
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  textAlign: "left"
                                }}
                              >
                                {item?.productName}
                              </p>
                            </div>
                          </td>
                          <td
                            className={classes.normalText}
                            style={{ textAlign: "right" }}
                          >
                            €{" "}
                            {getPrice(item.unitPrice)
                              .toFixed(2)
                              .replace(".", ",")}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td style={{ textAlign: "left" }}>
                            <ul
                              style={{
                                padding: 0,
                                margin: 0,
                                listStyle: "none"
                              }}
                            >
                              {(optionItems || []).map(
                                (opt: any, index: number) => (
                                  <li
                                    key={index}
                                    className={classes.normalText}
                                    style={{ textAlign: "left" }}
                                  >
                                    + {opt.name}
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
                        <td
                          className={classes.normalText}
                          style={{ textAlign: "left" }}
                        >
                          {item?.quantity} x
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <div>
                            <p
                              className={classes.normalText}
                              style={{
                                padding: 0,
                                margin: 0,
                                textAlign: "left"
                              }}
                            >
                              {item?.productName}
                            </p>
                          </div>
                        </td>
                        <td
                          className={classes.normalText}
                          style={{ textAlign: "right" }}
                        >
                          €{" "}
                          {getPrice(item.unitPrice)
                            .toFixed(2)
                            .replace(".", ",")}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>

            <div className={classes.discountBox}>
              {orderDetail?.discounts &&
                orderDetail?.discounts[0]?.amount.amount > 0 && (
                  <div className={classes.discountItem}>
                    <p className={classes.normalText}>DISCOUNT</p>
                    <p className={classes.normalText}>
                      - €{" "}
                      {orderDetail?.discounts &&
                        orderDetail?.discounts[0]?.amount.amount
                      // .toFixed(2)
                      // .replace(".", ",")
                      }
                    </p>
                  </div>
                )}

              {orderDetail?.deliveryFee > 0 && (
                <div className={classes.discountItem}>
                  <p className={classes.normalText}>DELIVERY COST</p>
                  <p className={classes.normalText}>
                    €{" "}
                    {orderDetail?.deliveryFee &&
                      orderDetail?.deliveryFee.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              )}

              {orderDetail?.transactionCost > 0 && (
                <div className={classes.discountItem}>
                  <p className={classes.normalText}>TRANSACTION COST (IDEAL)</p>
                  <p className={classes.normalText}>
                    €{" "}
                    {orderDetail?.transactionCost &&
                      orderDetail?.transactionCost.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              )}

              <div className={classes.discountItem}>
                <p className={classes.normalText}>TOTAL</p>
                <p className={classes.normalText}>
                  €{" "}
                  {orderDetail?.total &&
                    orderDetail?.total?.gross.amount
                      .toFixed(2)
                      .replace(".", ",")}
                </p>
              </div>
              {!tableName && (
                <div>
                  <p
                    className={classes.normalText}
                    style={{ margin: 0, textAlign: "left" }}
                  >
                    {payments &&
                    payments[0]?.gateway === "mirumee.payments.dummy"
                      ? "(UNPAID CASH ON DELIVERY)"
                      : "(PAID WITH IDEAL)"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className={classes.normalText} style={{ margin: 0 }}>
              {`Order placed on`}
            </p>
            <p className={classes.normalText} style={{ margin: 0 }}>
              {getDateTime()}
            </p>
          </div>
          {/* {!tableName && (
           
          )} */}

          <div>
            <p className={classes.normalText} style={{ margin: "8px 0 0 0" }}>
              {myStore?.myStore?.name}
            </p>
            <p className={classes.normalText} style={{ margin: 0 }}>
              powered by www.orderich.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
