import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import FormSpacer from "@saleor/components/FormSpacer";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import useSearchQuery from "@saleor/hooks/useSearchQuery";
import { buttonMessages } from "@saleor/intl";
import { SearchCategories_search_edges_node } from "@saleor/searches/types/SearchCategories";
import useScrollableDialogStyle from "@saleor/styles/useScrollableDialogStyle";
import { FetchMoreProps } from "@saleor/types";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { FormattedMessage, useIntl } from "react-intl";

import Checkbox from "../Checkbox";

export interface FormData {
  categories: SearchCategories_search_edges_node[];
  query: string;
}

const useStyles = makeStyles(
  {
    avatar: {
      "&:first-child": {
        paddingLeft: 0
      }
    },
    checkboxCell: {
      paddingLeft: 0
    },
    wideCell: {
      width: "100%"
    }
  },
  { name: "AssignCategoryDialog" }
);

interface AssignCategoriesDialogProps extends FetchMoreProps {
  categories: SearchCategories_search_edges_node[];
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onFetch: (value: string) => void;
  onSubmit: (data: SearchCategories_search_edges_node[]) => void;
}

function handleCategoryAssign(
  product: SearchCategories_search_edges_node,
  isSelected: boolean,
  selectedCategories: SearchCategories_search_edges_node[],
  setSelectedCategories: (data: SearchCategories_search_edges_node[]) => void
) {
  if (isSelected) {
    setSelectedCategories(
      selectedCategories.filter(
        selectedProduct => selectedProduct.id !== product.id
      )
    );
  } else {
    setSelectedCategories([...selectedCategories, product]);
  }
}

const AssignCategoriesDialog: React.FC<AssignCategoriesDialogProps> = props => {
  const {
    confirmButtonState,
    open,
    loading,
    categories: categories,
    hasMore,
    onClose,
    onFetch,
    onFetchMore,
    onSubmit
  } = props;
  const classes = useStyles(props);
  const scrollableDialogClasses = useScrollableDialogStyle({});

  const intl = useIntl();
  const [query, onQueryChange] = useSearchQuery(onFetch);
  const [selectedCategories, setSelectedCategories] = React.useState<
    SearchCategories_search_edges_node[]
  >([]);
  const container = React.useRef<HTMLDivElement>();

  const handleSubmit = () => onSubmit(selectedCategories);

  const containerHeight = container.current?.scrollHeight - 130;

  return (
    <Dialog
      classes={{ paper: scrollableDialogClasses.dialog }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Assign Categories"
          description="dialog header"
        />
      </DialogTitle>
      <DialogContent
        className={scrollableDialogClasses.content}
        ref={container}
      >
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={intl.formatMessage({
            defaultMessage: "Search Categories"
          })}
          placeholder={intl.formatMessage({
            defaultMessage: "Search by category name, etc..."
          })}
          fullWidth
          InputProps={{
            autoComplete: "off",
            endAdornment: loading && <CircularProgress size={16} />
          }}
        />
        <FormSpacer />
        <div
          className={scrollableDialogClasses.scrollArea}
          style={{ height: containerHeight }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={onFetchMore}
            hasMore={hasMore}
            useWindow={false}
            loader={
              <div className={scrollableDialogClasses.loadMoreLoaderContainer}>
                <CircularProgress size={16} />
              </div>
            }
            threshold={10}
          >
            <ResponsiveTable key="table">
              <TableBody>
                {categories &&
                  categories.map(category => {
                    const isSelected = !!selectedCategories.find(
                      selectedCategories =>
                        selectedCategories.id === category.id
                    );

                    return (
                      <TableRow key={category.id}>
                        <TableCell
                          padding="checkbox"
                          className={classes.checkboxCell}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={() =>
                              handleCategoryAssign(
                                category,
                                isSelected,
                                selectedCategories,
                                setSelectedCategories
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className={classes.wideCell}>
                          {category.name}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </ResponsiveTable>
          </InfiniteScroll>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage {...buttonMessages.back} />
        </Button>
        <ConfirmButton
          transitionState={confirmButtonState}
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleSubmit}
        >
          <FormattedMessage
            defaultMessage="Assign categories"
            description="button"
          />
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignCategoriesDialog.displayName = "AssignCategoriesDialog";
export default AssignCategoriesDialog;
