import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { renderCollection } from "@saleor/misc";
import { StoreListUrlSortField } from "@saleor/stores/urls";
import { makeStyles } from "@saleor/theme";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import React from "react";
import { FormattedMessage } from "react-intl";

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
      paddingLeft: 0,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    },
    colOrders: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "CustomerList" }
);

export interface StoreListProps
  extends ListProps,
    ListActions,
    SortPage<StoreListUrlSortField> {
  stores: any[];
}

const numberOfColumns = 2;

const StoreList: React.FC<StoreListProps> = props => {
  const {
    settings,
    disabled,
    stores,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    toolbar,
    toggle,
    toggleAll,
    selected,
    isChecked
  } = props;
  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={stores}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader arrowPosition="right" className={classes.colName}>
          <FormattedMessage defaultMessage="Store Name" />
        </TableCellHeader>
        <TableCellHeader arrowPosition="right" className={classes.colName}>
          <FormattedMessage defaultMessage="Domain" />
        </TableCellHeader>
        {/* <TableCellHeader className={classes.colEmail}>
          <FormattedMessage defaultMessage="Address" />
        </TableCellHeader>
        <TableCellHeader textAlign="center" className={classes.colOrders}>
          <FormattedMessage defaultMessage="Joined date" />
        </TableCellHeader> */}
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
          stores,
          store => {
            const isSelected = store ? isChecked(store.id) : false;

            return (
              <TableRow
                className={!!store ? classes.tableRow : undefined}
                hover={!!store}
                key={store ? store.id : "skeleton"}
                selected={isSelected}
                onClick={store ? onRowClick(store.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(store.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {/* {getUserName(store)} */}
                  {store && store.name}
                </TableCell>
                <TableCell className={classes.colEmail}>
                  {store && store.domain}
                  {/* {maybe<React.ReactNode>(() => store.email, <Skeleton />)} */}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No stores found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
StoreList.displayName = "StoreList";
export default StoreList;
