import { DialogContentText, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@saleor/components/ActionDialog";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import TableListPage from "@saleor/qrcode/components/TableListPage";
import {
  TypedBulkRemoveTables,
  useTableListQuery
} from "@saleor/qrcode/queries";
import {
  qrAddPath,
  qrListUrl,
  QRListUrlDialog,
  QRListUrlQueryParams,
  tableUrl
} from "@saleor/qrcode/urls";
import { mapEdgesToTableItem } from "@saleor/qrcode/util";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
// import { useIntl } from "react-intl";
interface IProps {
  params?: QRListUrlQueryParams;
}
function TableListViewComponent({ params }: IProps) {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const notify = useNotifier();

  const intl = useIntl();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  // const intl = useIntl();

  const { updateListSettings, settings } = useListSettings(
    ListViews.TABLE_LIST
  );
  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState
      // filter: getFilterVariables(params),
      // sort: getSortQueryVariables(params)
    }),
    [params, settings.rowNumber]
  );

  const { data, loading, refetch } = useTableListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const { loadNextPage, loadPreviousPage } = paginate(
    maybe(() => data.customers.pageInfo),
    paginationState,
    params
  );

  const [openModal, closeModal] = createDialogActionHandlers<
    QRListUrlDialog,
    QRListUrlQueryParams
  >(navigate, qrListUrl, params);
  const handleSort = createSortHandler(navigate, qrListUrl, params);
  // const currentTab =
  //   params.activeTab === undefined
  //     ? areFiltersApplied(params)
  //       ? tabs.length + 1
  //       : 0
  //     : parseInt(params.activeTab, 0);

  // console.log(mapEdgesToTableItem(data?.tableServices));
  const handleBulkDelete = data => {
    // if (data.customerBulkDelete.errors.length === 0) {
    //   notify({
    //     status: "success",
    //     text: intl.formatMessage(commonMessages.savedChanges)
    //   });
    //   reset();
    //   refetch();
    //   closeModal();
    // }

    if (data.tableServiceBulkDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
      refetch();
      closeModal();
    }
  };

  React.useEffect(() => {
    refetch();
  }, []);
  // console.log(params.ids);
  // refetch();
  return (
    <>
      <TypedBulkRemoveTables onCompleted={handleBulkDelete}>
        {(bulkDeteleTables, bulkDeleteTableOpts) => (
          // console.log(bulkDeleteTableOpts, "----------bulkDeleteTableOpts");

          <>
            <TableListPage
              // currentTab={null}
              onAdd={() => navigate(qrAddPath)}
              tables={mapEdgesToTableItem(data?.tableServices)}
              onNextPage={loadNextPage}
              onPreviousPage={loadPreviousPage}
              onRowClick={id => () => navigate(tableUrl(id))}
              toggle={toggle}
              toggleAll={toggleAll}
              isChecked={isSelected}
              disabled={loading}
              sort={getSortParams(params)}
              onSort={handleSort}
              selected={listElements.length}
              onUpdateListSettings={updateListSettings}
              settings={settings}
              // onTabChange={handleTabChange}
              // onTabDelete={() => openModal("delete-search")}
              // onTabSave={() => openModal("save-search")}
              toolbar={
                <IconButton
                  color="primary"
                  onClick={() =>
                    openModal("remove", {
                      ids: listElements
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              }
            />

            <ActionDialog
              open={
                params.action === "remove" && maybe(() => params.ids.length > 0)
              }
              onClose={closeModal}
              confirmButtonState={bulkDeleteTableOpts.status}
              onConfirm={() => {
                bulkDeteleTables({
                  variables: {
                    ids: params.ids
                  }
                });
              }}
              variant="delete"
              title={intl.formatMessage({
                defaultMessage: "Delete Table",
                description: "dialog header"
              })}
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="{counter,plural,one{Are you sure you want to delete this customer?} other{Are you sure you want to delete {displayQuantity} customers?}}"
                  values={{
                    counter: maybe(() => params.ids.length),
                    displayQuantity: (
                      <strong>{maybe(() => params.ids.length)}</strong>
                    )
                  }}
                />
              </DialogContentText>
            </ActionDialog>
          </>
        )}
      </TypedBulkRemoveTables>
    </>
  );
}

export default TableListViewComponent;
