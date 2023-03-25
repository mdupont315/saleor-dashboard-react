import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "@saleor/attributes/views/AttributeList/filters";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import { configurationMenuUrl } from "@saleor/configuration";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { Option_attributes_edges_node } from "@saleor/options/types/OptionList";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { EdgesType, mapEdgesToItems } from "@saleor/utils/maps";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { useIntl } from "react-intl";

import { PAGINATE_BY } from "../../../config";
import useBulkActions from "../../../hooks/useBulkActions";
import { maybe } from "../../../misc";
import AttributeBulkDeleteDialog from "../../components/AttributeBulkDeleteDialog";
import AttributeListPage from "../../components/AttributeListPage";
import { useOptionBulkDeleteMutation } from "../../mutations";
import { useOptionListQuery } from "../../queries";
import {
  attributeAddUrl,
  AttributeListUrlDialog,
  AttributeListUrlQueryParams,
  attributeUrl,
  optionListUrl
} from "../../urls";
import { getFilterQueryParam } from "./filters";
import { getSortQueryVariables } from "./sort";

interface AttributeListProps {
  params: AttributeListUrlQueryParams;
}

const AttributeList: React.FC<AttributeListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const intl = useIntl();

  const paginationState = createPaginationState(PAGINATE_BY, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );

  const { data, loading, refetch } = useOptionListQuery({
    variables: queryVariables
  });

  const [optionBulkDelete, optionBulkDeleteOpts] = useOptionBulkDeleteMutation({
    onCompleted: data => {
      if (data.optionBulkDelete.errors.length === 0) {
        closeModal();
        notify({
          status: "success",
          text: intl.formatMessage({
            defaultMessage: "Modifiers successfully delete",
            description: "deleted multiple modifiers"
          })
        });
        reset();
        refetch();
      }
    }
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [openModal, closeModal] = createDialogActionHandlers<
    AttributeListUrlDialog,
    AttributeListUrlQueryParams
  >(navigate, optionListUrl, params);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: optionListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      optionListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(optionListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    data &&
      maybe(
        () =>
          // @ts-ignore
          data.options.pageInfo
      ),
    paginationState,
    params
  );

  const handleSort = createSortHandler(navigate, optionListUrl, params);
  return (
    <>
      <AttributeListPage
        attributes={mapEdgesToItems(
          data?.options as EdgesType<Option_attributes_edges_node>
        )}
        currentTab={currentTab}
        disabled={loading || optionBulkDeleteOpts.loading}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        isChecked={isSelected}
        onAdd={() => navigate(attributeAddUrl())}
        onAll={resetFilters}
        onBack={() => navigate(configurationMenuUrl)}
        onFilterChange={changeFilters}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onRowClick={id => () => navigate(attributeUrl(id))}
        onSearchChange={handleSearchChange}
        onSort={handleSort}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        pageInfo={pageInfo}
        selected={listElements.length}
        sort={getSortParams(params)}
        tabs={tabs.map(tab => tab.name)}
        toggle={toggle}
        toggleAll={toggleAll}
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
      <AttributeBulkDeleteDialog
        confirmButtonState={optionBulkDeleteOpts.status}
        open={params.action === "remove" && maybe(() => params.ids.length > 0)}
        onConfirm={() => optionBulkDelete({ variables: { ids: params.ids } })}
        onClose={closeModal}
        quantity={maybe(() => params.ids.length)}
      />
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
    </>
  );
};
AttributeList.displayName = "AttributeList";

export default AttributeList;
