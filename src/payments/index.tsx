import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import { Route, Switch } from "react-router";

import { paymentSection } from "./urls";
import Payment from "./views/PaymentView";

const PaymentView = () => <Payment />;

function NotificationSection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.serviceTime)} />
      <Switch>
        <Route exact path={paymentSection} component={PaymentView} />
      </Switch>
    </>
  );
}

export default NotificationSection;
