import useUser from "@saleor/hooks/useUser";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  pluginListPath,
  PluginListUrlQueryParams,
  PluginListUrlSortField,
  pluginPath,
  PluginUrlQueryParams
} from "./urls";
import PluginsListComponent from "./views/PluginList";
import PluginsDetailsComponent from "./views/PluginsDetails";

const PluginList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: PluginListUrlQueryParams = asSortParams(
    qs,
    PluginListUrlSortField
  );
  return <PluginsListComponent params={params} />;
};

const PageDetails: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: PluginUrlQueryParams = qs;

  return (
    <PluginsDetailsComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const Component = () => {
  const intl = useIntl();
  const { user } = useUser();
  if (!user.isSuperuser) {
    if (!user.isSupplier) {
      return <Redirect to="/" />;
    }
  }

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.plugins)} />
      <Switch>
        <Route exact path={pluginListPath} component={PluginList} />
        <Route path={pluginPath(":id")} component={PageDetails} />
      </Switch>
    </>
  );
};

export default Component;
