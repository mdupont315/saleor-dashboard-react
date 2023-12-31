/* eslint-disable chai-friendly/no-unused-expressions */
import placeholderImg from "@assets/images/placeholder255x255.png";
import { DialogContentText, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAttributeValueDeleteMutation } from "@saleor/attributes/mutations";
import ChannelsWithVariantsAvailabilityDialog from "@saleor/channels/components/ChannelsWithVariantsAvailabilityDialog";
import {
  ChannelData,
  createChannelsDataWithPrice,
  createSortedChannelsDataFromProduct
} from "@saleor/channels/utils";
import ActionDialog from "@saleor/components/ActionDialog";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import AssignAttributeDialog from "@saleor/components/AssignAttributeDialog";
import { AttributeInput } from "@saleor/components/Attributes";
import ChannelsAvailabilityDialog from "@saleor/components/ChannelsAvailabilityDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { useShopLimitsQuery } from "@saleor/components/Shop/query";
import { WindowTitle } from "@saleor/components/WindowTitle";
import {
  DEFAULT_INITIAL_SEARCH_DATA,
  VALUES_PAGINATE_BY
} from "@saleor/config";
import { useFileUploadMutation } from "@saleor/files/mutations";
import { getSearchFetchMoreProps } from "@saleor/hooks/makeTopLevelSearch/utils";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useChannels from "@saleor/hooks/useChannels";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useOnSetDefaultVariant from "@saleor/hooks/useOnSetDefaultVariant";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import {
  useProductChannelListingUpdate,
  useProductDeleteMutation,
  useProductMediaCreateMutation,
  useProductMediaDeleteMutation,
  useProductMediaReorder,
  useProductOptionReorderMutation,
  useProductUpdateMutation,
  useProductVariantBulkDeleteMutation,
  useProductVariantChannelListingUpdate,
  useProductVariantReorderMutation,
  useSimpleProductUpdateMutation,
  useVariantCreateMutation
} from "@saleor/products/mutations";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import usePageSearch from "@saleor/searches/usePageSearch";
import useProductSearch from "@saleor/searches/useProductSearch";
import { ReorderEvent } from "@saleor/types";
import { getProductErrorMessage } from "@saleor/utils/errors";
import createAttributeValueSearchHandler from "@saleor/utils/handlers/attributeValueSearchHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import { useWarehouseList } from "@saleor/warehouses/queries";
import { warehouseAddPath } from "@saleor/warehouses/urls";
import React from "react";
import { useLazyQuery } from "react-apollo";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import { getMutationState } from "../../../misc";
import ProductUpdatePage, {
  ProductUpdatePageSubmitData
} from "../../components/ProductUpdatePage";
import {
  productOptionByProductId,
  useListOptionData,
  useProductDetails
} from "../../queries";
import { ProductMediaCreateVariables } from "../../types/ProductMediaCreate";
import { ProductUpdate as ProductUpdateMutationResult } from "../../types/ProductUpdate";
import {
  productImageUrl,
  productListUrl,
  productUrl,
  ProductUrlDialog,
  ProductUrlQueryParams,
  productVariantAddUrl,
  productVariantCreatorUrl,
  productVariantEditUrl
} from "../../urls";
import {
  createImageReorderHandler,
  createImageUploadHandler,
  createUpdateHandler,
  createVariantReorderHandler
} from "./handlers";
import useChannelsWithProductVariants from "./useChannelsWithProductVariants";

const messages = defineMessages({
  deleteProductDialogTitle: {
    defaultMessage: "Delete Product",
    description: "delete product dialog title"
  },
  deleteProductDialogSubtitle: {
    defaultMessage: "Are you sure you want to delete {name}?",
    description: "delete product dialog subtitle"
  },
  deleteVariantDialogTitle: {
    defaultMessage: "Delete Product Variants",
    description: "delete variant dialog title"
  },
  deleteVariantDialogSubtitle: {
    defaultMessage:
      "{counter,plural,one{Are you sure you want to delete this variant?} other{Are you sure you want to delete {displayQuantity} variants?}}",
    description: "delete variant dialog subtitle"
  }
});

interface ProductUpdateProps {
  id: string;
  params: ProductUrlQueryParams;
}

export interface AvailableAttributeFragment {
  __typename?: "Attribute";
  id: any;
  name: any;
  slug: any;
}

export const ProductUpdate: React.FC<ProductUpdateProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const [values, setValues] = React.useState<any>([]);

  const [checkedOption, setCheckedOption] = React.useState<any>([]);

  const [checking, setChecking] = React.useState<any>([]);

  const [assignAttribute, setAssignAttribute] = React.useState<any>([]);

  const intl = useIntl();
  const {
    loadMore: loadMoreCategories,
    search: searchCategories,
    result: searchCategoriesOpts
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreCollections,
    search: searchCollections,
    result: searchCollectionsOpts
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMorePages,
    search: searchPages,
    result: searchPagesOpts
  } = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreProducts,
    search: searchProducts,
    result: searchProductsOpts
  } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreAttributeValues,
    search: searchAttributeValues,
    result: searchAttributeValuesOpts
  } = createAttributeValueSearchHandler(DEFAULT_INITIAL_SEARCH_DATA);
  const warehouses = useWarehouseList({
    displayLoader: true,
    variables: {
      first: 50
    }
  });
  const shop = useShop();
  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});
  const [
    productVariantCreate,
    productVariantCreateOpts
  ] = useVariantCreateMutation({});

  const { availableChannels, channel } = useAppChannel();
  const { data, loading, refetch } = useProductDetails({
    displayLoader: true,
    variables: {
      id,
      firstValues: VALUES_PAGINATE_BY
    }
  });

  const {
    data: listData,
    loading: listLoading,
    refetch: listRefetch
  } = useListOptionData({
    variables: {
      first: 100
    }
  });

  React.useEffect(() => {
    // if (data) {
    //   setValues(data.product.options);
    // }
  }, [data]);

  const limitOpts = useShopLimitsQuery({
    variables: {
      productVariants: true
    }
  });

  const [uploadFile, uploadFileOpts] = useFileUploadMutation({});

  const handleUpdate = (data: ProductUpdateMutationResult) => {
    // if (data.productUpdate.errors.length === 0) {
    //   notify({
    //     status: "success",
    //     text: intl.formatMessage(commonMessages.savedChanges)
    //   });
    // } else {

    // }
    let err = false;
    Object.keys(data).map(item => {
      if (data[item]?.errors.length !== 0) {
        data[item]?.errors.map(error => {
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          });
        });
        err = false;
      } else {
        err = true;
      }
    });

    if (err) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
    // console.log(data, "---------");
  };

  const [updateProduct, updateProductOpts] = useProductUpdateMutation({
    onCompleted: handleUpdate
  });
  const [
    updateSimpleProduct,
    updateSimpleProductOpts
  ] = useSimpleProductUpdateMutation({
    onCompleted: handleUpdate
  });

  const [
    reorderProductImages,
    reorderProductImagesOpts
  ] = useProductMediaReorder({});

  const [deleteProduct, deleteProductOpts] = useProductDeleteMutation({
    onCompleted: () => {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Product removed"
        })
      });
      navigate(productListUrl());
    }
  });

  const [
    createProductImage,
    createProductImageOpts
  ] = useProductMediaCreateMutation({
    onCompleted: data => {
      const imageError = data.productMediaCreate.errors.find(
        error => error.field === ("image" as keyof ProductMediaCreateVariables)
      );
      if (imageError) {
        notify({
          status: "error",
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
      }
    }
  });

  const [deleteProductImage] = useProductMediaDeleteMutation({
    onCompleted: () =>
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      })
  });

  const [
    bulkProductVariantDelete,
    bulkProductVariantDeleteOpts
  ] = useProductVariantBulkDeleteMutation({
    onCompleted: data => {
      if (data.productVariantBulkDelete.errors.length === 0) {
        closeModal();
        reset();
        refetch();
        limitOpts.refetch();
      }
    }
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductUrlDialog,
    ProductUrlQueryParams
  >(navigate, params => productUrl(id, params), params);

  const product = data?.product;

  const allChannels: ChannelData[] = createChannelsDataWithPrice(
    product,
    availableChannels
  ).sort((channel, nextChannel) =>
    channel.name.localeCompare(nextChannel.name)
  );

  const isSimpleProduct = !data?.product?.productType?.hasVariants;

  const {
    channelsWithVariantsData,
    haveChannelsWithVariantsDataChanged,
    setHaveChannelsWithVariantsChanged,
    onChannelsAvailiabilityModalOpen,
    channelsData,
    setChannelsData,
    ...channelsWithVariantsProps
  } = useChannelsWithProductVariants({
    channels: allChannels,
    variants: product?.variants,
    action: params?.action,
    openModal,
    closeModal
  });

  const productChannelsChoices: ChannelData[] = createSortedChannelsDataFromProduct(
    product
  );

  const {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    handleChannelsModalOpen,
    isChannelSelected,
    isChannelsModalOpen,
    setCurrentChannels,
    toggleAllChannels
  } = useChannels(productChannelsChoices, params?.action, {
    closeModal,
    openModal
  });

  const [updateChannels, updateChannelsOpts] = useProductChannelListingUpdate({
    onCompleted: data => {
      if (!!data.productChannelListingUpdate.errors.length) {
        data.productChannelListingUpdate.errors.forEach(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      }
    }
  });

  const [productOptionReorder] = useProductOptionReorderMutation({
    onCompleted: data => {
      if (data.reorderProductOption.errors.length === 0) {
        refetch();
        getDataProductOption();
      }
    }
  });

  const handleProductOptionsReorder = ({
    newIndex,
    oldIndex
  }: ReorderEvent) => {
    // console.log("Reorder");
    productOptionReorder({
      variables: {
        moves: [
          {
            optionId:
              dataProductOption?.productOption?.edges[oldIndex]?.node?.option
                ?.id,
            sortOrder: newIndex - oldIndex
          }
        ],
        productId: product.id
      }
    });
  };

  const [
    getDataProductOption,
    { data: dataProductOption, loading: productOptionLoading }
  ] = useLazyQuery(productOptionByProductId, {
    fetchPolicy: "no-cache",
    variables: {
      productId: product?.id || ""
    }
  });

  React.useEffect(() => {
    if (product && product?.id) {
      setValues(product.options);
      getDataProductOption();
    }
  }, [product]);

  const sort = (data: any) => {
    if (
      data &&
      values?.length === data?.productOption?.edges.length &&
      productOptionLoading === false
    ) {
      const sortedProductOptions = [];
      data.productOption.edges.forEach((item: any) => {
        values.forEach((value: any) => {
          if (value.id === item?.node.option.id) {
            sortedProductOptions.push(value);
          }
        });
      });
      setValues(sortedProductOptions);
    }
  };
  // console.log("productOptionLoading", dataProductOption);

  React.useEffect(() => {
    // console.log("Data change");
    if (productOptionLoading === false) {
      sort(dataProductOption);
    }
  }, [data, productOptionLoading]);

  const [
    updateVariantChannels,
    updateVariantChannelsOpts
  ] = useProductVariantChannelListingUpdate({});

  const [
    createProductMedia,
    createProductMediaOpts
  ] = useProductMediaCreateMutation({
    onCompleted: data => {
      const errors = data.productMediaCreate.errors;

      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
    }
  });

  const handleMediaUrlUpload = (mediaUrl: string) => {
    const variables = {
      alt: "",
      mediaUrl,
      product: product.id
    };

    createProductMedia({
      variables
    });
  };

  const [
    deleteAttributeValue,
    deleteAttributeValueOpts
  ] = useAttributeValueDeleteMutation({});

  const handleBack = () => navigate(productListUrl());

  if (product === null) {
    return <NotFoundPage onBack={handleBack} />;
  }
  const handleVariantAdd = () => navigate(productVariantAddUrl(id));

  const handleImageDelete = (id: string) => () =>
    deleteProductImage({ variables: { id } });
  const handleImageEdit = (imageId: string) => () =>
    navigate(productImageUrl(id, imageId));

  const handleSubmit = createMetadataUpdateHandler(
    product,
    createUpdateHandler(
      product,
      allChannels,
      variables => uploadFile({ variables }),
      variables => updateProduct({ variables }),
      variables => updateSimpleProduct({ variables }),
      updateChannels,
      updateVariantChannels,
      productVariantCreate,
      variables => deleteAttributeValue({ variables })
    ),
    variables => updateMetadata({ variables }),
    variables => updatePrivateMetadata({ variables })
  );

  const handleImageUpload = createImageUploadHandler(id, variables =>
    createProductImage({ variables })
  );
  const handleImageReorder = createImageReorderHandler(product, variables =>
    reorderProductImages({ variables })
  );

  const [
    reorderProductVariants,
    reorderProductVariantsOpts
  ] = useProductVariantReorderMutation({});

  const handleVariantReorder = createVariantReorderHandler(product, variables =>
    reorderProductVariants({ variables })
  );

  const onToggle = (id: string) => {
    const findChecked = checkedOption.find(checkId => checkId === id);
    if (findChecked) {
      setCheckedOption(checkedOption.filter(checkId => checkId !== id));
    } else {
      setCheckedOption([...checkedOption, id]);
    }
  };

  const onToggleAll = () => {
    if (checkedOption.length > 0) {
      setCheckedOption([]);
    } else {
      setCheckedOption(values.map(value => value.id));
    }
  };

  const onAttributeUnassign = (id: string) => {
    setValues(values.filter(value => value.id !== id));
    setAssignAttribute(assignAttribute.filter(value => value.id !== id));
  };

  const onAttributeUnassignAll = () => {
    checkedOption.reverse().forEach(index => {
      const indexValues = values.findIndex(value => value.id === index);
      values.splice(indexValues, 1);
      setValues([...values]);
    });
  };

  const handleAssignAttribute = () => {
    if (assignAttribute.length > 0) {
      const array = Array.from(new Set(values.concat(assignAttribute)));
      setValues(array);
      setChecking([]);
      setCheckedOption([]);
      closeModal();
    }
  };

  const loadMore = () => null;

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    navigate(
      productUrl(id, {
        action: "assign-attribute-value",
        id: attribute.id
      })
    );

  const disableFormSave =
    uploadFileOpts.loading ||
    createProductImageOpts.loading ||
    deleteProductOpts.loading ||
    reorderProductImagesOpts.loading ||
    updateProductOpts.loading ||
    reorderProductVariantsOpts.loading ||
    updateChannelsOpts.loading ||
    updateVariantChannelsOpts.loading ||
    productVariantCreateOpts.loading ||
    deleteAttributeValueOpts.loading ||
    createProductMediaOpts.loading ||
    productOptionLoading ||
    loading;

  const formTransitionState = getMutationState(
    updateProductOpts.called || updateSimpleProductOpts.called,
    updateProductOpts.loading || updateSimpleProductOpts.loading,
    updateProductOpts.data?.productUpdate.errors,
    updateSimpleProductOpts.data?.productUpdate.errors,
    updateSimpleProductOpts.data?.productVariantUpdate.errors,
    createProductMediaOpts.data?.productMediaCreate.errors
  );

  const categories = mapEdgesToItems(searchCategoriesOpts?.data?.search);

  const collections = mapEdgesToItems(searchCollectionsOpts?.data?.search);

  const attributeValues = mapEdgesToItems(
    searchAttributeValuesOpts?.data?.attribute.choices
  );

  const errors = [
    ...(updateProductOpts.data?.productUpdate.errors || []),
    ...(updateSimpleProductOpts.data?.productUpdate.errors || []),
    ...(productVariantCreateOpts.data?.productVariantCreate.errors || [])
  ];

  const onSetDefaultVariant = useOnSetDefaultVariant(
    product ? product.id : null,
    null
  );
  const channelsErrors = [
    ...(updateChannelsOpts?.data?.productChannelListingUpdate?.errors || []),
    ...(updateVariantChannelsOpts?.data?.productVariantChannelListingUpdate
      ?.errors || [])
  ];

  const fetchMoreCollections = getSearchFetchMoreProps(
    searchCollectionsOpts,
    loadMoreCollections
  );

  const fetchMoreCategories = getSearchFetchMoreProps(
    searchCategoriesOpts,
    loadMoreCategories
  );

  const fetchMoreReferencePages = getSearchFetchMoreProps(
    searchPagesOpts,
    loadMorePages
  );

  const fetchMoreReferenceProducts = getSearchFetchMoreProps(
    searchProductsOpts,
    loadMoreProducts
  );

  const fetchMoreAttributeValues = {
    hasMore: !!searchAttributeValuesOpts.data?.attribute?.choices?.pageInfo
      ?.hasNextPage,
    loading: !!searchAttributeValuesOpts.loading,
    onFetchMore: loadMoreAttributeValues
  };

  const listDataAttribute = () => {
    const array: any = [];
    const formatList: any = listData && mapEdgesToItems(listData.options);

    if (data && formatList) {
      values.forEach(index => {
        const indexList = formatList.findIndex(value => value.id === index.id);
        formatList.splice(indexList, 1);
      });
    }
    formatList.map(value => {
      if (value) {
        array.push({
          __typename: "Attribute",
          id: value.id || "",
          name: value.name || "",
          slug: value.type || ""
        });
      }
    });

    return array;
  };

  return (
    <>
      <WindowTitle title={data?.product?.name} />
      {!!allChannels?.length &&
        (isSimpleProduct ? (
          <ChannelsAvailabilityDialog
            isSelected={isChannelSelected}
            channels={allChannels}
            onChange={channelsToggle}
            onClose={handleChannelsModalClose}
            open={isChannelsModalOpen}
            title={intl.formatMessage({
              defaultMessage: "Manage Products Channel Availability"
            })}
            confirmButtonState="default"
            selected={channelListElements.length}
            onConfirm={handleChannelsConfirm}
            toggleAll={toggleAllChannels}
          />
        ) : (
          <ChannelsWithVariantsAvailabilityDialog
            channelsWithVariantsData={channelsWithVariantsData}
            haveChannelsWithVariantsDataChanged={
              haveChannelsWithVariantsDataChanged
            }
            {...channelsWithVariantsProps}
            channels={allChannels}
            variants={product?.variants}
          />
        ))}
      <ProductUpdatePage
        hasChannelChanged={
          haveChannelsWithVariantsDataChanged ||
          productChannelsChoices?.length !== currentChannels?.length
        }
        isSimpleProduct={isSimpleProduct}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        channelsErrors={channelsErrors}
        currentChannels={currentChannels}
        allChannelsCount={allChannels?.length}
        channelsData={channelsData}
        setChannelsData={setChannelsData}
        categories={categories}
        collections={collections}
        attributeValues={attributeValues}
        channelsWithVariantsData={channelsWithVariantsData}
        defaultWeightUnit={shop?.defaultWeightUnit}
        disabled={disableFormSave}
        onSetDefaultVariant={onSetDefaultVariant}
        errors={errors}
        fetchCategories={searchCategories}
        fetchCollections={searchCollections}
        fetchAttributeValues={searchAttributeValues}
        limits={limitOpts.data?.shop.limits}
        saveButtonBarState={formTransitionState}
        media={data?.product?.media}
        header={product?.name}
        placeholderImage={placeholderImg}
        product={product}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses)}
        taxTypes={data?.taxTypes}
        variants={product?.variants}
        onBack={handleBack}
        onDelete={() => openModal("remove")}
        onImageReorder={handleImageReorder}
        onMediaUrlUpload={handleMediaUrlUpload}
        onSubmit={(formData: ProductUpdatePageSubmitData) => {
          setHaveChannelsWithVariantsChanged(false);
          return handleSubmit(formData);
        }}
        onWarehouseConfigure={() => navigate(warehouseAddPath)}
        onVariantAdd={handleVariantAdd}
        onVariantsAdd={() => navigate(productVariantCreatorUrl(id))}
        onVariantShow={variantId => () =>
          navigate(productVariantEditUrl(product.id, variantId))}
        onVariantReorder={handleVariantReorder}
        onImageUpload={handleImageUpload}
        onImageEdit={handleImageEdit}
        onImageDelete={handleImageDelete}
        onProductOptionsReorder={handleProductOptionsReorder}
        toolbar={
          <IconButton
            color="primary"
            onClick={() =>
              openModal("remove-variants", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        fetchMoreCategories={fetchMoreCategories}
        fetchMoreCollections={fetchMoreCollections}
        selectedChannelId={channel?.id}
        assignReferencesAttributeId={
          params.action === "assign-attribute-value" && params.id
        }
        onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search)}
        referenceProducts={mapEdgesToItems(searchProductsOpts?.data?.search)}
        fetchReferencePages={searchPages}
        fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceProducts={searchProducts}
        fetchMoreReferenceProducts={fetchMoreReferenceProducts}
        fetchMoreAttributeValues={fetchMoreAttributeValues}
        onCloseDialog={() => navigate(productUrl(id))}
        values={maybe(
          () => values
          // values.sort((a, b) => {
          //   if (a.name.length > b.name.length) {
          //     return 1;
          //   }
          //   if (a.name.length < b.name.length) {
          //     return -1;
          //   }
          //   return 0;
          // })
        )}
        onAttributeAdd={() => openModal("assign-attribute-value")}
        isCheckedOption={checkedOption}
        onToggle={onToggle}
        onToggleAll={onToggleAll}
        onAttributeUnassign={onAttributeUnassign}
        onAttributeUnassignAll={onAttributeUnassignAll}
      />
      <ActionDialog
        open={params.action === "remove"}
        onClose={closeModal}
        confirmButtonState={deleteProductOpts.status}
        onConfirm={() => deleteProduct({ variables: { id } })}
        variant="delete"
        title={intl.formatMessage(messages.deleteProductDialogTitle)}
      >
        <DialogContentText>
          <FormattedMessage
            {...messages.deleteProductDialogSubtitle}
            values={{ name: product?.name }}
          />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === "remove-variants"}
        onClose={closeModal}
        confirmButtonState={bulkProductVariantDeleteOpts.status}
        onConfirm={() =>
          bulkProductVariantDelete({
            variables: {
              ids: params.ids
            }
          })
        }
        variant="delete"
        title={intl.formatMessage(messages.deleteVariantDialogTitle)}
      >
        <DialogContentText>
          <FormattedMessage
            {...messages.deleteVariantDialogSubtitle}
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
      {listData && (
        <AssignAttributeDialog
          attributes={maybe(listDataAttribute)}
          errors={maybe(
            () =>
              listData.opts.data.productAttributeAssign.errors.map(
                err => err.message
              ),
            []
          )}
          showFillter={false}
          loading={listLoading}
          onClose={closeModal}
          onSubmit={handleAssignAttribute}
          onFetch={() => listRefetch}
          onFetchMore={loadMore}
          onOpen={() => listDataAttribute()}
          hasMore={maybe(
            () =>
              listData.data.productType.availableAttributes.pageInfo
                .hasNextPage,
            false
          )}
          selected={checking}
          open={params.action === "assign-attribute-value"}
          onToggle={attributeId => {
            const checkHadValues = !!checking.find(id => id === attributeId);
            if (checkHadValues) {
              setChecking(checking.filter(id => id !== attributeId));
              setAssignAttribute(
                assignAttribute.filter(value => value.id !== attributeId)
              );
            } else {
              setChecking([...checking, attributeId]);
              setAssignAttribute([
                ...assignAttribute,
                mapEdgesToItems(listData.options).find(
                  // @ts-ignore
                  value => value.id === attributeId
                )
              ]);
            }
          }}
        />
      )}
    </>
  );
};
export default ProductUpdate;
