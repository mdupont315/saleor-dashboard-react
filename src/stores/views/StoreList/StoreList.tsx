import { DialogContentText } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@saleor/components/ActionDialog";
import { DEFAULT_INITIAL_PAGINATION_DATA } from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { useDeleteStore, useStoreListQuery } from "@saleor/stores/queries";
import {
  storeAddUrl,
  StoreListUrlQueryParams,
  StoresListUrlDialog,
  storesManagementListUrl,
  storesManagementSection,
  storeUrl
} from "@saleor/stores/urls";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import StoreListPage from "../../components/StoreListPage";
import {
  areFiltersApplied,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs,
  getFilterVariables
} from "./filters";
import { getSortQueryVariables } from "./sort";

interface CustomerListProps {
  params: any;
}

export const StoreList: React.FC<CustomerListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const notify = useNotifier();
  const intl = useIntl();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const tabs = getFilterTabs();
  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: storesManagementListUrl,
    getFilterQueryParam,
    navigate,
    params
  });
  const { updateListSettings, settings } = useListSettings(
    ListViews.STORE_LIST
  );

  const paginationState = createPaginationState(settings.rowNumber, params);

  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );

  const { data, loading, refetch } = useStoreListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      storesManagementListUrl({
        activeTab: tab.toString()
        // ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
    StoresListUrlDialog,
    StoreListUrlQueryParams
  >(navigate, storesManagementListUrl, params);

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.stores.pageInfo),
    paginationState,
    params
  );
  const handleSort = createSortHandler(
    navigate,
    storesManagementListUrl,
    params
  );

  React.useEffect(
    () =>
      navigate(
        storesManagementListUrl({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA
        }),
        true
      ),
    [settings.rowNumber]
  );

  const [deleteStore] = useDeleteStore({
    onCompleted: data => {
      if (data?.storeDelete.storeErrors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(storesManagementSection);
        refetch();
        //
      }
    }
  });

  const handleDelete = () => {
    Promise.all(
      listElements.map(item => {
        deleteStore({
          variables: {
            id: item
          }
        });
      })
    );
  };

  return (
    <>
      <StoreListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        tabs={tabs.map(tab => tab.name)}
        stores={maybe(() => (data.stores.edges || []).map(edge => edge.node))}
        settings={settings}
        disabled={loading}
        pageInfo={pageInfo}
        onAdd={() => navigate(storeAddUrl)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        onRowClick={id => () => navigate(storeUrl(id))}
        onSort={handleSort}
        toolbar={
          <IconButton color="primary" onClick={() => openModal("remove")}>
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
      />

      <ActionDialog
        open={params.action === "remove"}
        confirmButtonState={"default"}
        onClose={closeModal}
        onConfirm={handleDelete}
        title={intl.formatMessage({
          defaultMessage: "Delete Store",
          description: "dialog header"
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete ?} other{Are you sure you want to delete {displayQuantity} store?}}"
            description="dialog content"
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default StoreList;
