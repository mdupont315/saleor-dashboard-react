import {
  makeStyles,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from "@material-ui/core";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import StatusLabel from "@saleor/components/StatusLabel";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { renderCollection } from "@saleor/misc";
import { TableListUrlSortField } from "@saleor/qrcode/urls";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

// const numberOfColumns =2;

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colEmail: {},
      colName: {},
      colOrders: {
        width: 200
      }
    },
    colEmail: {},
    colName: {
      paddingLeft: 0
    },
    colOrders: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "tableList" }
);
export interface TableListProps
  extends ListProps,
    ListActions,
    SortPage<TableListUrlSortField> {
  tables: any[];
}
function TableList(props: any) {
  const {
    tables,
    selected,
    disabled,
    toggleAll,
    toolbar,
    sort,
    onSort,
    settings,
    pageInfo,
    onNextPage,
    toggle,
    onPreviousPage,
    onUpdateListSettings,
    isChecked,
    onRowClick
  } = props;
  // console.log(settings);

  const numberOfColumns = 3;

  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={tables}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === TableListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(TableListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="QR Location" />
        </TableCellHeader>
        <TableCellHeader>
          <FormattedMessage defaultMessage="Status" />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          tables,
          (table: any) => {
            const isSelected = table ? isChecked(table.id) : false;
            return (
              <TableRow
                className={!!table ? classes.tableRow : undefined}
                hover={!!table}
                key={table ? table.id : "skeleton"}
                selected={isSelected}
                onClick={table ? onRowClick(table.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(table.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {table && table?.tableName}
                </TableCell>
                <TableCell className={classes.colName}>
                  {table && <StatusLabel status="success" label={"isActive"} />}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="Not found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
}

export default TableList;
