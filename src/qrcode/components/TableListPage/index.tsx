import { Button, Card, Container } from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
// import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { TableListUrlSortField } from "@saleor/qrcode/urls";
import { ListActions, SortPage, TabPageProps } from "@saleor/types";
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
  onBack: () => void;
}
function TableListPage({ onAdd, onBack, ...tableProps }: IProps) {
  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.QRcode)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create QR code"
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
