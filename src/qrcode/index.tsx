import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import {
  qrAddPath,
  qrListPath,
  qrPath,
  QRUrlQueryParams,
  TableListUrlSortField
} from "./urls";
import TableCreateViewComponent from "./views/CreateTable";
import TableListViewComponent from "./views/TableList";

const TableListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params = asSortParams(qs, TableListUrlSortField);
  return <TableListViewComponent params={params} />;
};

const TableCreateView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: QRUrlQueryParams = qs;

  return <TableCreateViewComponent params={params} />;
};

const TableDetailsView: React.FC<RouteComponentProps<{ id?: string }>> = ({
  location,
  match
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: QRUrlQueryParams = qs;

  return (
    <TableCreateViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

function QRcodeSection() {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.QRcode)} />
      <Switch>
        <Route exact path={qrListPath} component={TableListView} />
        <Route exact path={qrAddPath} component={TableCreateView} />
        <Route path={qrPath(":id")} component={TableDetailsView} />
      </Switch>
    </>
  );
}

export default QRcodeSection;
