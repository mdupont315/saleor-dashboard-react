// import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import useListSettings from "@saleor/hooks/useListSettings";
import useLocalPageInfo from "@saleor/hooks/useLocalPageInfo";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { getStringOrPlaceholder } from "@saleor/misc";
import { formatChannelsChangeHandler } from "@saleor/options/handlers";
import { getAttributeData } from "@saleor/options/utils/data";
import { ListViews, ReorderEvent } from "@saleor/types";
// import { AttributeErrorCode } from "@saleor/types/globalTypes";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
// import createMetadataCreateHandler from "@saleor/utils/handlers/metadataCreateHandler";
import { add, move, remove, updateAtIndex } from "@saleor/utils/lists";
import React from "react";
import { useIntl } from "react-intl";
import slugify from "slugify";

import AttributePage, {
  AttributePageFormData
} from "../../components/AttributePage";
import AttributeValueDeleteDialog from "../../components/AttributeValueDeleteDialog";
import AttributeValueEditDialog, {
  AttributeValueEditDialogFormData
} from "../../components/AttributeValueEditDialog";
import { useOptionCreateMutation } from "../../mutations";
import {
  attributeAddUrl,
  AttributeAddUrlDialog,
  AttributeAddUrlQueryParams,
  attributeUrl,
  optionListUrl
} from "../../urls";

interface AttributeDetailsProps {
  params: AttributeAddUrlQueryParams;
}

export interface ChannelOptinData {
  channelId: string;
  price: number;
}

export interface AttributeCreateValueEditDialogFormData {
  name: string;
  channelListing: ChannelOptinData[];
}

function areValuesEqual(
  a: AttributeCreateValueEditDialogFormData,
  b: AttributeCreateValueEditDialogFormData
) {
  return a.name === b.name;
}

const AttributeDetails: React.FC<AttributeDetailsProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [values, setValues] = React.useState<
    AttributeCreateValueEditDialogFormData[]
  >([]);

  const [cacheValues, setCacheValue] = React.useState<
    AttributeValueEditDialogFormData[]
  >([]);

  const { updateListSettings, settings } = useListSettings(
    ListViews.ATTRIBUTE_VALUE_LIST
  );

  const {
    pageInfo,
    pageValues,
    loadNextPage,
    loadPreviousPage
  } = useLocalPageInfo(values, settings?.rowNumber);

  const [attributeCreate, attributeCreateOpts] = useOptionCreateMutation({
    onCompleted: data => {
      if (data.optionCreate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage({
            defaultMessage: "Successfully created attribute"
          })
        });
        navigate(attributeUrl(data.optionCreate.option.id));
      }
    }
  });

  const id = params.id
    ? parseInt(params.id, 0) + pageInfo.startCursor
    : undefined;

  const [openModal, closeModal] = createDialogActionHandlers<
    AttributeAddUrlDialog,
    AttributeAddUrlQueryParams
  >(navigate, attributeAddUrl, params);

  const handleValueDelete = () => {
    const newValues = remove(values[id], values, areValuesEqual);
    setValues(newValues);
    closeModal();
  };

  const handleValueUpdate = (input: AttributeValueEditDialogFormData) => {
    setCacheValue([
      ...cacheValues.slice(0, id),
      input,
      ...cacheValues.slice(id)
    ]);
    const inputFormat = {
      ...input,
      channelListing: formatChannelsChangeHandler(input.channelListing)
    };
    setValues(updateAtIndex(inputFormat, values, id));
    closeModal();
  };

  const handleValueCreate = (input: AttributeValueEditDialogFormData) => {
    setCacheValue([...cacheValues, input]);
    const inputFormat = {
      ...input,
      channelListing: formatChannelsChangeHandler(input.channelListing)
    };
    const newValues = add(inputFormat, values);
    setValues(newValues);
    closeModal();
  };

  const handleValueReorder = ({ newIndex, oldIndex }: ReorderEvent) =>
    setValues(
      move(
        values[pageInfo.startCursor + oldIndex],
        values,
        areValuesEqual,
        pageInfo.startCursor + newIndex
      )
    );

  const handleSubmit = async (data: AttributePageFormData) => {
    const input = getAttributeData(data, values);

    const result = await attributeCreate({
      variables: {
        input
      }
    });

    return result.data.attributeCreate?.attribute?.id || null;
  };

  return (
    <>
      <AttributePage
        attribute={null}
        disabled={attributeCreateOpts.loading}
        errors={attributeCreateOpts.data?.optionCreate.errors || []}
        onBack={() => navigate(optionListUrl())}
        onDelete={undefined}
        onSubmit={handleSubmit}
        onValueAdd={() => openModal("add-value")}
        onValueDelete={id =>
          openModal("remove-value", {
            id
          })
        }
        onValueReorder={handleValueReorder}
        onValueUpdate={id =>
          openModal("edit-value", {
            id
          })
        }
        saveButtonBarState={attributeCreateOpts.status}
        values={{
          __typename: "AttributeValueCountableConnection" as "AttributeValueCountableConnection",
          pageInfo: {
            __typename: "PageInfo" as "PageInfo",
            endCursor: "",
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: ""
          },
          edges: pageValues.map((value, valueIndex) => ({
            __typename: "AttributeValueCountableEdge" as "AttributeValueCountableEdge",
            cursor: "1",
            node: {
              __typename: "AttributeValue" as "AttributeValue",
              file: null,
              id: valueIndex.toString(),
              reference: null,
              slug: slugify(value.name).toLowerCase(),
              sortOrder: valueIndex,
              value: null,
              richText: null,
              boolean: null,
              ...value
            }
          }))
        }}
        settings={settings}
        onUpdateListSettings={updateListSettings}
        pageInfo={pageInfo}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
      />
      <AttributeValueEditDialog
        attributeValue={null}
        confirmButtonState="default"
        disabled={false}
        // errors={valueErrors}
        open={params.action === "add-value"}
        onClose={closeModal}
        onSubmit={handleValueCreate}
      />
      {values.length > 0 && (
        <>
          <AttributeValueDeleteDialog
            attributeName={undefined}
            open={params.action === "remove-value"}
            name={getStringOrPlaceholder(values[id]?.name)}
            confirmButtonState="default"
            onClose={closeModal}
            onConfirm={handleValueDelete}
          />
          <AttributeValueEditDialog
            attributeValue={cacheValues[id]}
            params={"edit-value"}
            open={params.action === "edit-value"}
            confirmButtonState="default"
            disabled={false}
            // errors={valueErrors}
            onClose={closeModal}
            onSubmit={handleValueUpdate}
          />
        </>
      )}
    </>
  );
};
AttributeDetails.displayName = "AttributeDetails";

export default AttributeDetails;
