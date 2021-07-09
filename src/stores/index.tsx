import { WindowTitle } from "@saleor/components/WindowTitle";
import { useGetMyStore } from "@saleor/emergency/queries";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

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
  );
};

function StoreSection({ isAdmin }: any) {
  const intl = useIntl();
  const { data } = useGetMyStore({ variables: {} });

  const checkAdmin = isAdmin => {
    if (isAdmin) {
      return (
        <Switch>
          <Route exact path={storeAddPath} component={DetailStoreView} />
          <Route
            exact
            path={storeEditPath(":id")}
            component={DetailStoreView}
          />
          <Route exact path={storeListPath} component={StoreListView} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path={storeEditPath(":id")} component={DetailStoreView} />
        {!isAdmin && typeof data !== "undefined" && (
          <Redirect to={storeEditPath(data?.myStore?.id)} />
        )}
      </Switch>
    );
  };

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.stores)} />
      {checkAdmin(isAdmin)}
    </>
  );
}

export default StoreSection;
