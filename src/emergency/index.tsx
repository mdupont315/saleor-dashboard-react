import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import { emergencySection } from "./urls";
import EmergencyView from "./views/EmergencyView";

const ServicesView: React.FC<RouteComponentProps<{}>> = ({}) => (
  <EmergencyView />
);

function EmergencySection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.serviceTime)} />
      <Switch>
        <Route exact path={emergencySection} component={ServicesView} />
      </Switch>
    </>
  );
}

export default EmergencySection;
