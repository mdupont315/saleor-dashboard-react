import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import { deliverySection } from "./urls";
import DeliveryView from "./views/DeliveryView";

const DeliveryViewComponent: React.FC<RouteComponentProps<{}>> = ({}) => (
  <DeliveryView />
);

function DeliverySection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.serviceTime)} />
      <Switch>
        <Route exact path={deliverySection} component={DeliveryViewComponent} />
      </Switch>
    </>
  );
}

export default DeliverySection;
