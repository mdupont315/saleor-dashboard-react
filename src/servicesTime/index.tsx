import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import { secvicesSection } from "./urls";
import ServiceView from "./views/ServiceView";

const ServicesView: React.FC<RouteComponentProps<{}>> = ({}) => <ServiceView />;

function ServiceSection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.serviceTime)} />
      <Switch>
        <Route exact path={secvicesSection} component={ServicesView} />
        {/* <Route exact path={storeListPath} component={StoreListView} />
        <Route exact path={storeAddPath} component={DetailStoreView} />
        <Route exact path={storeUploadPath(":id")} component={StoreUpLoad} />

        <Route exact path={storeEditPath(":id")} component={DetailStoreView} />
        <Route exact path={storePath(":id")} component={DetailStoreViewMode} /> */}
      </Switch>
    </>
  );
}

export default ServiceSection;
