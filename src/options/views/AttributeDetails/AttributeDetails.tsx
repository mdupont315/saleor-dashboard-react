import { ChannelSaleData, createSortedSaleData } from "@saleor/channels/utils";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import useListSettings from "@saleor/hooks/useListSettings";
import useLocalPaginator, {
  useLocalPaginationState
} from "@saleor/hooks/useLocalPaginator";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import React from "react";
import { useIntl } from "react-intl";

import AttributeDeleteDialog from "../../components/AttributeDeleteDialog";
import AttributePage, {
  AttributePageFormData
} from "../../components/AttributePage";
import AttributeValueDeleteDialog from "../../components/AttributeValueDeleteDialog";
import AttributeValueEditDialog, {
  AttributeValueEditDialogFormData
} from "../../components/AttributeValueEditDialog";
import {
  useOptionDeleteMutation,
  useOptionUpdateMutation,
  useOptionValueUpdateMutation
} from "../../mutations";
import { useOptionDetailsQuery } from "../../queries";
import {
  attributeUrl,
  AttributeUrlDialog,
  AttributeUrlQueryParams,
  optionListUrl
} from "../../urls";

interface AttributeDetailsProps {
  id: string;
  params: AttributeUrlQueryParams;
}

export interface ChannelOptinData {
  channelId: string;
  price: number;
}

export interface AttributeCreateValueEditDialogFormData {
  name: string;
  channelListing: ChannelOptinData[];
}

const AttributeDetails: React.FC<AttributeDetailsProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [openModal, closeModal] = createDialogActionHandlers<
    AttributeUrlDialog,
    AttributeUrlQueryParams
  >(navigate, params => attributeUrl(id, params), params);

  const { updateListSettings, settings } = useListSettings(
    ListViews.ATTRIBUTE_VALUE_LIST
  );

  const [
    valuesPaginationState,
    setValuesPaginationState
  ] = useLocalPaginationState(settings?.rowNumber);

  const [cacheValues, setCacheValues] = React.useState<any>({});

  const [removeValues, setRemoveValues] = React.useState<any>([]);

  const [addValues, setAddValues] = React.useState<any>([]);

  const { data, loading, refetch } = useOptionDetailsQuery({
    variables: {
      id
    }
  });

  const cacheData = data && JSON.parse(JSON.stringify(data));

  React.useEffect(() => {
    setCacheValues(data);
  }, [data, refetch]);

  const { availableChannels } = useAppChannel(false);
  const allChannels: ChannelSaleData[] = createSortedSaleData(
    availableChannels
  );

  const paginateValues = useLocalPaginator(setValuesPaginationState);
  const { loadNextPage, loadPreviousPage, pageInfo } = paginateValues(
    data?.attribute?.choices?.pageInfo,
    valuesPaginationState
  );

  const [attributeDelete, attributeDeleteOpts] = useOptionDeleteMutation({
    onCompleted: data => {
      if (data.optionDelete.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage({
            defaultMessage: "Option deleted"
          })
        });
        navigate(optionListUrl());
      }
    }
  });

  const [
    attributeValueUpdate,
    attributeValueUpdateOpts
  ] = useOptionValueUpdateMutation({
    onCompleted: data => {
      if (data.optionValueUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
        closeModal();
      }
    }
  });

  const [attributeUpdate, attributeUpdateOpts] = useOptionUpdateMutation({
    onCompleted: data => {
      if (data.optionUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
        closeModal();
        setRemoveValues([]);
        setAddValues([]);
      }
    }
  });

  const handleValueDelete = () => {
    const option = cacheValues.option.optionValues.filter(
      value => params.id === value.id
    )[0];
    setAddValues(addValues.filter(value => params.id !== value.id));
    if (option.__typename === "OptionValue") {
      setRemoveValues([...removeValues, option.id]);
    }
    setCacheValues({
      option: {
        ...cacheValues.option,
        optionValues: cacheValues.option.optionValues.filter(
          value => params.id !== value.id
        )
      }
    });
    closeModal();
  };

  const handleValueCreate = async (data: AttributeValueEditDialogFormData) => {
    const input = {
      addValues: [
        {
          name: data.name,
          channelListing: data.channelListing.map(channel => ({
            channelId: channel.id,
            currency: channel.currency,
            price: channel.discountValue
          }))
        }
      ]
    };
    const result = await attributeUpdate({
      variables: {
        id,
        input
      }
    });
    return result;
  };

  const handleValueUpdate = async (input: any) => {
    const findElement = cacheValues.option.optionValues.filter(
      value => params.id === value.id
    )[0];

    const channelListingUpdate = input.channelListing?.map(value => ({
      channelId: value.id,
      price: Number(value.discountValue.toFixed(1)),
      currency: value.currency,
      id: findElement.channelListing.find(find => find.channel.id === value.id)
        .id
    }));

    const result = await attributeValueUpdate({
      variables: {
        id: params.id,
        input: { name: input.name, channelListingUpdate }
      }
    });
    return result;
  };

  const handleSubmit = async (data: AttributePageFormData) => {
    const input = {
      name: data.name,
      required: data.required,
      type: data.type,
      addValues: addValues.map(value => ({
        name: value.name,
        channelListing: value.channelListing.map(channel => ({
          channelId: channel.id,
          price: channel.discountValue,
          currency: channel.currency
        }))
      })),
      removeValues
    };

    const result = await attributeUpdate({
      variables: {
        id,
        input
      }
    });

    return result.data.optionUpdate.errors;
  };

  return (
    <>
      <AttributePage
        attribute={maybe(() => data.option)}
        disabled={loading}
        errors={attributeUpdateOpts.data?.optionUpdate.errors || []}
        onBack={() => navigate(optionListUrl())}
        onDelete={() => openModal("remove")}
        onSubmit={handleSubmit}
        onValueAdd={() => openModal("add-value")}
        onValueDelete={id =>
          openModal("remove-value", {
            id
          })
        }
        onValueUpdate={id =>
          openModal("edit-value", {
            id
          })
        }
        saveButtonBarState={attributeUpdateOpts.status}
        values={
          cacheValues && {
            __typename: "AttributeValueCountableConnection" as "AttributeValueCountableConnection",
            pageInfo: {
              __typename: "PageInfo" as "PageInfo",
              endCursor: "",
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: ""
            },
            edges:
              cacheValues.option &&
              cacheValues.option.optionValues.map((value, valueIndex) => ({
                __typename: "AttributeValueCountableEdge" as "AttributeValueCountableEdge",
                cursor: "1",
                node: {
                  __typename: "AttributeValue" as "AttributeValue",
                  file: null,
                  id: valueIndex.toString(),
                  reference: null,
                  slug: value.name,
                  sortOrder: valueIndex,
                  value: null,
                  richText: null,
                  boolean: null,
                  ...value
                }
              }))
          }
        }
        settings={settings}
        onUpdateListSettings={updateListSettings}
        pageInfo={pageInfo}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
      />
      <AttributeDeleteDialog
        open={params.action === "remove"}
        name={maybe(() => data.option.name, "...")}
        confirmButtonState={attributeDeleteOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          attributeDelete({
            variables: {
              id
            }
          })
        }
      />
      <AttributeValueDeleteDialog
        attributeName={maybe(() => cacheData.option.name, "...")}
        open={params.action === "remove-value"}
        name={maybe(
          () =>
            cacheValues.option.optionValues.find(
              value => params.id === value.id
            ).name,
          "..."
        )}
        confirmButtonState="default"
        useName={true}
        onClose={closeModal}
        onConfirm={handleValueDelete}
      />
      <AttributeValueEditDialog
        attributeValue={null}
        disabled={loading}
        params={"add-value"}
        confirmButtonState={attributeUpdateOpts.status}
        open={params.action === "add-value"}
        onClose={closeModal}
        onSubmit={handleValueCreate}
      />
      <AttributeValueEditDialog
        attributeValue={maybe(() => {
          const beforeData =
            cacheValues &&
            cacheValues.option.optionValues.find(
              value => value.id === params.id
            );
          const newChannelListing = [];
          beforeData.channelListing.map(data => {
            allChannels.find(value => {
              if (beforeData.__typename === "OptionValue") {
                if (value.id === data.channel.id) {
                  value.discountValue = data.price.amount.toString();
                  newChannelListing.push(value);
                  return value;
                }
              }
              if (beforeData.__typename === "OptionCreate") {
                if (value.id === data.id) {
                  value.discountValue = data.price.amount.toString();
                  newChannelListing.push(value);
                  return value;
                }
              }
            });
          });
          const newData = {
            name: beforeData.name || "",
            channelListing: newChannelListing || []
          };
          return newData;
        })}
        confirmButtonState={attributeValueUpdateOpts.status}
        disabled={loading}
        open={params.action === "edit-value"}
        params={"edit-value"}
        onClose={closeModal}
        onSubmit={handleValueUpdate}
      />
    </>
  );
};
AttributeDetails.displayName = "AttributeDetails";

export default AttributeDetails;
