import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import TableListPage from "@saleor/qrcode/components/TableListPage";
import { useTableListQuery } from "@saleor/qrcode/queries";
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
// import { useIntl } from "react-intl";

function TableListViewComponent({ params }) {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const { isSelected, listElements, toggle, toggleAll } = useBulkActions(
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
    [params]
  );

  const { data, loading } = useTableListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const { loadNextPage, loadPreviousPage } = paginate(
    maybe(() => data.customers.pageInfo),
    paginationState,
    params
  );

  const [openModal] = createDialogActionHandlers<
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

  return (
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
    </>
  );
}

export default TableListViewComponent;
