import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import {
  storeAddPath,
  storeEditPath,
  storeListPath,
  StoreListUrlSortField,
  StoreUrlQueryParams
} from "./urls";
import StoreDetailsViewComponent from "./views/StoreDetailsViewComponent";
import StoreListViewComponent from "./views/StoreList";

const StoreListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, StoreListUrlSortField);

  return <StoreListViewComponent params={params} />;
};

interface StoreDetailsRouteParams {
  id: string;
}
const DetailStoreView: React.FC<RouteComponentProps<
  StoreDetailsRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: StoreUrlQueryParams = qs;

  return (
    <StoreDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
    // <h2>ádasd</h2>
  );
};

function StoreSection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.stores)} />
      <Switch>
        <Route exact path={storeListPath} component={StoreListView} />
        <Route exact path={storeAddPath} component={DetailStoreView} />
        <Route exact path={storeEditPath(":id")} component={DetailStoreView} />

        {/* <Route exact path={storeListPath} component={StoreListView} />
        <Route exact path={storeUploadPath(":id")} component={StoreUpLoad} />

        <Route exact path={storeEditPath(":id")} component={DetailStoreView} />
        <Route exact path={storePath(":id")} component={DetailStoreViewMode} /> */}
      </Switch>
    </>
  );
}

export default StoreSection;
