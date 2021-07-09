import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import { notificationSection } from "./urls";
import Notification from "./views/NotificationView";

const NotificationView: React.FC<RouteComponentProps<{}>> = ({}) => (
  <Notification />
);

function NotificationSection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.serviceTime)} />
      <Switch>
        <Route exact path={notificationSection} component={NotificationView} />
      </Switch>
    </>
  );
}

export default NotificationSection;
