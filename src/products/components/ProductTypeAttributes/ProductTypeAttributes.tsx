import {
  Button,
  Card,
  IconButton,
  TableCell,
  TableRow
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@saleor/components/CardTitle";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import {
  SortableTableBody,
  SortableTableRow
} from "@saleor/components/SortableTable";
import TableHead from "@saleor/components/TableHead";
import { maybe, renderCollection, stopPropagation } from "@saleor/misc";
import { makeStyles } from "@saleor/theme";
// import { ListActions, ReorderAction } from "@saleor/types";
import { ProductAttributeType } from "@saleor/types/globalTypes";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  ProductTypeDetails_productType_productAttributes,
  ProductTypeDetails_productType_variantAttributes
} from "../../types/ProductTypeDetails";

const useStyles = makeStyles(
  {
    colAction: {
      "&:last-child": {
        paddingRight: 0
      },
      width: 80
    },
    colGrab: {
      width: 60
    },
    colName: {},
    colSlug: {
      width: 300
    },
    link: {
      cursor: "pointer"
    },
    textLeft: {
      textAlign: "left"
    }
  },
  { name: "ProductTypeAttributes" }
);

interface ProductTypeAttributesProps {
  attributes:
    | ProductTypeDetails_productType_productAttributes[]
    | ProductTypeDetails_productType_variantAttributes[];
  onAttributeAssign?: (type: ProductAttributeType) => void;
  toggle?: (id: string) => void;
  toggleAll?: () => void;
  onAttributeUnassign?: (id: string) => void;
  onAttributeReorder?: () => void;
  onAttributeClick?: (id: string) => void;
  onAttributeUnassignAll: () => void;
  isChecked: any;
  type?: string;
  disabled?: boolean;
}

const numberOfColumns = 5;

const ProductTypeAttributes: React.FC<ProductTypeAttributesProps> = props => {
  const {
    attributes,
    isChecked,
    toggle,
    toggleAll,
    type,
    disabled,
    onAttributeAssign,
    onAttributeUnassign,
    onAttributeReorder,
    onAttributeClick,
    onAttributeUnassignAll
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card
      data-test={
        type === ProductAttributeType.PRODUCT
          ? "product-attributes"
          : "variant-attributes"
      }
    >
      <CardTitle
        title={
          type === ProductAttributeType.PRODUCT
            ? intl.formatMessage({
                defaultMessage: "Product Attributes",
                description: "section header"
              })
            : intl.formatMessage({
                defaultMessage: "Option",
                description: "section header"
              })
        }
        toolbar={
          <Button
            color="primary"
            variant="text"
            onClick={() => onAttributeAssign(ProductAttributeType[type])}
          >
            <FormattedMessage
              defaultMessage="Assign option"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col className={classes.colGrab} />
          <col />
          <col className={classes.colName} />
          <col className={classes.colSlug} />
          <col className={classes.colAction} />
        </colgroup>
        {attributes?.length > 0 && (
          <TableHead
            colSpan={numberOfColumns}
            disabled={disabled}
            dragRows
            selected={isChecked.length}
            items={undefined}
            toggleAll={toggleAll}
            toolbar={
              <Button
                color="primary"
                variant="text"
                onClick={() => onAttributeUnassignAll()}
              >
                <FormattedMessage
                  defaultMessage="Un Assign "
                  description="button"
                />
              </Button>
            }
          >
            <TableCell className={classes.colName}>
              <FormattedMessage defaultMessage="Attribute name" />
            </TableCell>
            <TableCell className={classes.colName}>
              <FormattedMessage
                defaultMessage="Type"
                description="attribute internal name"
              />
            </TableCell>
            <TableCell />
          </TableHead>
        )}
        <SortableTableBody onSortEnd={onAttributeReorder}>
          {/* {console.log("ATRIBUTE", attributes)} */}
          {renderCollection(
            attributes,
            (attribute, attributeIndex) => {
              const isSelected = attribute
                ? !!isChecked.find(
                    selectedAttribute => selectedAttribute === attribute.id
                  )
                : false;

              return (
                <SortableTableRow
                  selected={isSelected}
                  className={!!attribute ? classes.link : undefined}
                  hover={!!attribute}
                  onClick={
                    !!attribute
                      ? () => onAttributeClick(attribute.id)
                      : undefined
                  }
                  key={maybe(() => attribute.id)}
                  index={attributeIndex || 0}
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
                    {maybe(() => attribute.name) ? (
                      attribute.name
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colSlug} data-test="type">
                    {maybe(() => attribute.type) ? (
                      attribute.type
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colAction}>
                    <IconButton
                      onClick={stopPropagation(() =>
                        onAttributeUnassign(attribute.id)
                      )}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </SortableTableRow>
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
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductTypeAttributes.displayName = "ProductTypeAttributes";
export default ProductTypeAttributes;
