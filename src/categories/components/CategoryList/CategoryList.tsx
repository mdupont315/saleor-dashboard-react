import { TableCell, TableFooter, TableRow } from "@material-ui/core";
import { CategoryListUrlSortField } from "@saleor/categories/urls";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import {
  SortableTableBody,
  SortableTableRow
} from "@saleor/components/SortableTable";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { CategoryFragment } from "@saleor/fragments/types/CategoryFragment";
import { maybe, renderCollection } from "@saleor/misc";
import { makeStyles } from "@saleor/theme";
import { ListActions, ListProps, ReorderAction, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colCategoryName: {
        width: 600
      },
      colProducts: {
        // width: 160
      },
      colSubcategories: {
        // width: 160
      }
    },
    colName: {
      paddingLeft: 0,
      // width: "50px",
      "&$colNameFixed": {
        width: 50
      }
    },
    colType: {
      width: "50px"
    },
    noOfProduct: {
      width: "100%",
      textAlign: "center"
    },
    colProducts: {
      textAlign: "center"
    },
    colSubcategories: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "CategoryList" }
);

interface CategoryListProps
  extends ListProps,
    ListActions,
    SortPage<CategoryListUrlSortField> {
  categories?: CategoryFragment[];
  onValueReorder?: ReorderAction;
  isRoot: boolean;
  onAdd?();
}

const numberOfColumns = 5;

const CategoryList: React.FC<CategoryListProps> = props => {
  const {
    categories,
    disabled,
    settings,
    sort,
    pageInfo,
    isChecked,
    isRoot,
    selected,
    toggle,
    toggleAll,
    toolbar,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    onValueReorder
  } = props;

  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <colgroup>
        {/* <col />
          <col /> */}
        <col className={classes.colName} />
        <col className={classes.colType} />
        <col className={classes.colCategoryName} />
        <col className={classes.colName} />
        {/* <col className={classes.noOfProduct} /> */}
      </colgroup>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={selected ? categories : []}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader style={{ width: "50px" }} />
        <TableCellHeader align="left" style={{ padding: 0, width: "100px" }}>
          <Checkbox
            indeterminate={
              categories && categories.length > selected && selected > 0
            }
            checked={selected === 0 ? false : true}
            disabled={disabled}
            onChange={() => toggleAll(categories, selected)}
          />
        </TableCellHeader>
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          className={classes.colName}
          disableClick={!isRoot}
          onClick={() => isRoot && onSort(CategoryListUrlSortField.name)}
        >
          <FormattedMessage defaultMessage="Category Name" />
        </TableCellHeader>

        {/* <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.subcategoryCount
              ? getArrowDirection(sort.asc)
              : undefined
          }
          className={classes.colSubcategories}
          disableClick={!isRoot}
          onClick={() =>
            isRoot && onSort(CategoryListUrlSortField.subcategoryCount)
          }
        >
          <FormattedMessage
            defaultMessage="Subcategories"
            description="number of subcategories"
          />
        </TableCellHeader> */}

        <TableCellHeader
          textAlign="center"
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.productCount
              ? getArrowDirection(sort.asc)
              : undefined
          }
          className={classes.noOfProduct}
          disableClick={!isRoot}
          onClick={() =>
            isRoot && onSort(CategoryListUrlSortField.productCount)
          }
        >
          <FormattedMessage
            defaultMessage="No. of Products"
            description="number of products"
          />
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
      <SortableTableBody onSortEnd={onValueReorder}>
        {renderCollection(
          categories,
          (category, valueIndex) => {
            const isSelected = category ? isChecked(category.id) : false;

            return (
              <SortableTableRow
                index={valueIndex || 0}
                className={classes.tableRow}
                hover={!!category}
                onClick={category ? onRowClick(category.id) : undefined}
                key={category ? category.id : "skeleton"}
                selected={isSelected}
                data-test="id"
                data-test-id={maybe(() => category.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(category.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName} data-test="name">
                  {category && category.name ? category.name : <Skeleton />}
                </TableCell>
                {/* <TableCell className={classes.colSubcategories}>
                  {category &&
                  category.children &&
                  category.children.totalCount !== undefined ? (
                    category.children.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell> */}
                <TableCell className={classes.noOfProduct}>
                  {category &&
                  category.products &&
                  category.products.totalCount !== undefined ? (
                    category.products.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </SortableTableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {isRoot ? (
                  <FormattedMessage defaultMessage="No categories found" />
                ) : (
                  <FormattedMessage defaultMessage="No subcategories found" />
                )}
              </TableCell>
            </TableRow>
          )
        )}
      </SortableTableBody>
    </ResponsiveTable>
  );
};

CategoryList.displayName = "CategoryList";
export default CategoryList;
