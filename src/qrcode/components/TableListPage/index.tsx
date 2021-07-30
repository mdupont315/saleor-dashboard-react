import { Button, Card, Container } from "@material-ui/core";
// import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { TableListUrlSortField } from "@saleor/qrcode/urls";
import {
  ListActions,
  // PageListProps,
  SortPage,
  TabPageProps
} from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import TableList from "../TableList";

interface IProps  // PageListProps,
  extends ListActions,
    // FilterPageProps<CustomerFilterKeys, CustomerListFilterOpts>,
    SortPage<TableListUrlSortField>,
    TabPageProps {
  tables: any[];
  onAdd?: any;
  onNextPage?: any;
  onPreviousPage?: any;
  onRowClick?: any;
  disabled?: boolean;
  onUpdateListSettings?: any;
  settings?: any;
}
function TableListPage({ onAdd, ...tableProps }: IProps) {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.QRcode)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create QRcode"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        {/* <FilterBar/> */}
        <TableList {...tableProps} />
      </Card>
    </Container>
  );
}

export default TableListPage;
