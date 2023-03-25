import { TableBody, TableCell, TableFooter, TableRow } from "@material-ui/core";
import { AttributeListUrlSortField } from "@saleor/attributes/urls";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { maybe, renderCollection } from "@saleor/misc";
import { makeStyles } from "@saleor/theme";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Option_attributes_edges_node } from "../../types/OptionList";

export interface AttributeListProps
  extends ListProps,
    ListActions,
    SortPage<AttributeListUrlSortField> {
  attributes: Option_attributes_edges_node[];
}

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colFaceted: {
        width: 180
      },
      colName: {
        width: "auto"
      },
      colSearchable: {
        width: 180
      },
      colSlug: {
        width: 200
      },
      colVisible: {
        width: 180
      }
    },
    colFaceted: {
      textAlign: "center"
    },
    colName: {
      // width: "33%"
    },
    colSearchable: {
      textAlign: "center"
    },
    colSlug: {
      paddingLeft: 0
    },
    colVisible: {
      textAlign: "center"
    },
    link: {
      cursor: "pointer"
    }
  }),
  { name: "AttributeList" }
);

const numberOfColumns = 3;

const AttributeList: React.FC<AttributeListProps> = ({
  attributes,
  disabled,
  isChecked,
  onNextPage,
  onPreviousPage,
  onRowClick,
  pageInfo,
  selected,
  sort,
  toggle,
  toggleAll,
  toolbar,
  onSort
}) => {
  const classes = useStyles({});
  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={attributes}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          className={classes.colName}
          direction={
            sort.sort === AttributeListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(AttributeListUrlSortField.name)}
        >
          <FormattedMessage defaultMessage="Name" description="name's label'" />
        </TableCellHeader>
        {/* <TableCellHeader className={classes.colName}>
          <FormattedMessage
            defaultMessage="Description"
            description="description's label'"
          />
        </TableCellHeader> */}
        <TableCellHeader className={classes.colName}>
          <FormattedMessage defaultMessage="Type" description="Type's label'" />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          attributes,
          attribute => {
            const isSelected = attribute ? isChecked(attribute.id) : false;

            return (
              <TableRow
                selected={isSelected}
                hover={!!attribute}
                key={attribute ? attribute.id : "skeleton"}
                onClick={attribute && onRowClick(attribute.id)}
                className={classes.link}
                data-test="id"
                data-test-id={maybe(() => attribute.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(attribute.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName} data-test="name">
                  {attribute ? attribute.name : <Skeleton />}
                </TableCell>
                {/* <TableCell className={classes.colName} data-test="description">
                  {attribute ? attribute.description : <Skeleton />}
                </TableCell> */}
                <TableCell className={classes.colName} data-test="type">
                  {attribute ? attribute.type : <Skeleton />}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No attributes found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
AttributeList.displayName = "AttributeList";
export default AttributeList;
