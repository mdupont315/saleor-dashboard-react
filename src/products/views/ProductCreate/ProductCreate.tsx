import { ChannelData, createSortedChannelsData } from "@saleor/channels/utils";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import AssignAttributeDialog from "@saleor/components/AssignAttributeDialog";
import { AttributeInput } from "@saleor/components/Attributes";
import ChannelsAvailabilityDialog from "@saleor/components/ChannelsAvailabilityDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import {
  DEFAULT_INITIAL_SEARCH_DATA,
  VALUES_PAGINATE_BY
} from "@saleor/config";
import { useFileUploadMutation } from "@saleor/files/mutations";
import useChannels from "@saleor/hooks/useChannels";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import { maybe } from "@saleor/misc";
import ProductCreatePage from "@saleor/products/components/ProductCreatePage";
import {
  useProductChannelListingUpdate,
  useProductDeleteMutation,
  useProductVariantChannelListingUpdate,
  useVariantCreateMutation
} from "@saleor/products/mutations";
import { useProductCreateMutation } from "@saleor/products/mutations";
import {
  useListOptionData,
  useProductTypeQuery
} from "@saleor/products/queries";
import {
  productAddUrl,
  ProductCreateUrlDialog,
  ProductCreateUrlQueryParams,
  productListUrl,
  productUrl
} from "@saleor/products/urls";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import usePageSearch from "@saleor/searches/usePageSearch";
import useProductSearch from "@saleor/searches/useProductSearch";
import useProductTypeSearch from "@saleor/searches/useProductTypeSearch";
import { useTaxTypeList } from "@saleor/taxes/queries";
import { getProductErrorMessage } from "@saleor/utils/errors";
import createAttributeValueSearchHandler from "@saleor/utils/handlers/attributeValueSearchHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createMetadataCreateHandler from "@saleor/utils/handlers/metadataCreateHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import { useWarehouseList } from "@saleor/warehouses/queries";
import { warehouseAddPath } from "@saleor/warehouses/urls";
import React from "react";
import { useIntl } from "react-intl";

import { createHandler } from "./handlers";

interface ProductCreateProps {
  params: ProductCreateUrlQueryParams;
}

export const ProductCreateView: React.FC<ProductCreateProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();
  const [productCreateComplete, setProductCreateComplete] = React.useState<
    boolean
  >(false);
  const [selectedProductTypeId, setSelectedProductTypeId] = React.useState<
    string
  >();

  const [values, setValues] = React.useState<any>([]);

  const [checking, setChecking] = React.useState<any>([]);

  const [assignAttribute, setAssignAttribute] = React.useState<any>([]);

  const [toggle, setToggle] = React.useState<any>([]);

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductCreateUrlDialog,
    ProductCreateUrlQueryParams
  >(navigate, params => productAddUrl(params), params);

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreCollections,
    search: searchCollection,
    result: searchCollectionOpts
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreProductTypes,
    search: searchProductTypes,
    result: searchProductTypesOpts
  } = useProductTypeSearch({
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
  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});
  const taxTypes = useTaxTypeList({});
  const { data: selectedProductType } = useProductTypeQuery({
    variables: {
      id: selectedProductTypeId,
      firstValues: VALUES_PAGINATE_BY
    },
    skip: !selectedProductTypeId
  });

  const { data: listData, loading: listLoading, refetch } = useListOptionData({
    variables: {
      first: 100
    }
  });

  const productTypes = mapEdgesToItems(searchProductTypesOpts?.data?.search);

  const { availableChannels } = useAppChannel(false);
  const allChannels: ChannelData[] = createSortedChannelsData(
    availableChannels
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
  } = useChannels(allChannels, params?.action, {
    closeModal,
    openModal
  });

  const handleSuccess = (productId: string) => {
    notify({
      status: "success",
      text: intl.formatMessage({
        defaultMessage: "Product created"
      })
    });
    navigate(productUrl(productId));
  };

  const [uploadFile, uploadFileOpts] = useFileUploadMutation({});

  const [updateChannels, updateChannelsOpts] = useProductChannelListingUpdate(
    {}
  );
  const [
    updateVariantChannels,
    updateVariantChannelsOpts
  ] = useProductVariantChannelListingUpdate({});

  const handleBack = () => navigate(productListUrl());

  const [productCreate, productCreateOpts] = useProductCreateMutation({});
  const [deleteProduct] = useProductDeleteMutation({});
  const [
    productVariantCreate,
    productVariantCreateOpts
  ] = useVariantCreateMutation({
    onCompleted: data => {
      const errors = data.productVariantCreate.errors;
      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      }
    }
  });

  const handleSubmit = async data => {
    const result = await createMetadataCreateHandler(
      createHandler(
        selectedProductType.productType,
        variables => uploadFile({ variables }),
        variables => productCreate({ variables }),
        variables => productVariantCreate({ variables }),
        updateChannels,
        updateVariantChannels,
        deleteProduct
      ),
      updateMetadata,
      updatePrivateMetadata
    )(data);

    if (result) {
      setProductCreateComplete(true);
    }
  };

  const handleAssignAttribute = () => {
    if (assignAttribute.length > 0) {
      setValues(assignAttribute);
      closeModal();
    }
  };

  const onAttributeUnassign = id => {
    setValues(values.filter(value => value.id !== id));
    setToggle(toggle.filter(toggleId => toggleId !== id));
  };

  const onToggle = id => {
    const troggleCheck = toggle.find(toggleId => toggleId === id);
    if (troggleCheck) {
      setToggle(toggle.filter(toggleId => toggleId !== id));
    } else {
      setToggle([...toggle, id]);
    }
  };

  const onToggleAll = () => {
    if (toggle.length > 0) {
      setToggle([]);
    } else {
      setToggle(checking);
    }
  };

  const onAttributeUnassignAll = () => {
    toggle.reverse().forEach(index => {
      const indexValues = values.findIndex(value => value.id === index);
      values.splice(indexValues, 1);
      setValues([...values]);
    });
  };
  const loadMore = () => null;

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    navigate(
      productAddUrl({
        action: "assign-attribute-value",
        id: attribute.id
      })
    );

  React.useEffect(() => {
    const productId = productCreateOpts.data?.productCreate?.product?.id;

    if (productCreateComplete && productId) {
      handleSuccess(productId);
    }
  }, [productCreateComplete]);

  const fetchMoreProductTypes = {
    hasMore: searchProductTypesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchProductTypesOpts.loading,
    onFetchMore: loadMoreProductTypes
  };
  const fetchMoreCollections = {
    hasMore: searchCollectionOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCollectionOpts.loading,
    onFetchMore: loadMoreCollections
  };
  const fetchMoreCategories = {
    hasMore: searchCategoryOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCategoryOpts.loading,
    onFetchMore: loadMoreCategories
  };
  const fetchMoreReferencePages = {
    hasMore: searchPagesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchPagesOpts.loading,
    onFetchMore: loadMorePages
  };
  const fetchMoreReferenceProducts = {
    hasMore: searchProductsOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchProductsOpts.loading,
    onFetchMore: loadMoreProducts
  };
  const fetchMoreAttributeValues = {
    hasMore: !!searchAttributeValuesOpts.data?.attribute?.choices?.pageInfo
      ?.hasNextPage,
    loading: !!searchAttributeValuesOpts.loading,
    onFetchMore: loadMoreAttributeValues
  };

  const loading =
    uploadFileOpts.loading ||
    productCreateOpts.loading ||
    productVariantCreateOpts.loading ||
    updateChannelsOpts.loading ||
    updateVariantChannelsOpts.loading;

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create Product",
          description: "window title"
        })}
      />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={!channelListElements.length}
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
      )}
      <ProductCreatePage
        allChannelsCount={allChannels?.length}
        currentChannels={currentChannels}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search)}
        collections={mapEdgesToItems(searchCollectionOpts?.data?.search)}
        attributeValues={mapEdgesToItems(
          searchAttributeValuesOpts?.data?.attribute.choices
        )}
        loading={loading}
        channelsErrors={
          updateVariantChannelsOpts.data?.productVariantChannelListingUpdate
            ?.errors
        }
        errors={[
          ...(productCreateOpts.data?.productCreate.errors || []),
          ...(productVariantCreateOpts.data?.productVariantCreate.errors || [])
        ]}
        fetchCategories={searchCategory}
        fetchCollections={searchCollection}
        fetchProductTypes={searchProductTypes}
        fetchAttributeValues={searchAttributeValues}
        header={intl.formatMessage({
          defaultMessage: "New Product",
          description: "page header"
        })}
        productTypes={productTypes}
        onBack={handleBack}
        onSubmit={handleSubmit}
        onWarehouseConfigure={() => navigate(warehouseAddPath)}
        saveButtonBarState={productCreateOpts.status}
        fetchMoreCategories={fetchMoreCategories}
        fetchMoreCollections={fetchMoreCollections}
        fetchMoreProductTypes={fetchMoreProductTypes}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses)}
        taxTypes={taxTypes.data?.taxTypes || []}
        weightUnit={shop?.defaultWeightUnit}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
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
        onCloseDialog={() => navigate(productAddUrl())}
        selectedProductType={selectedProductType?.productType}
        onSelectProductType={id => setSelectedProductTypeId(id)}
        values={values}
        onAttributeAdd={() => openModal("assign-attribute-value")}
        onAttributeUnassign={onAttributeUnassign}
        toggle={onToggle}
        toggleAll={onToggleAll}
        isChecked={toggle}
        onAttributeUnassignAll={onAttributeUnassignAll}
      />
      {listData && (
        <AssignAttributeDialog
          attributes={maybe(() => {
            const attributes: any = mapEdgesToItems(listData.options);
            return attributes.map(value => ({
              id: value.id,
              name: value.name,
              slug: value.type,
              __typename: "Attribute"
            }));
          })}
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
          onFetch={refetch}
          onFetchMore={loadMore}
          onOpen={refetch}
          hasMore={maybe(
            () =>
              listData.data.productType.availableAttributes.pageInfo
                .hasNextPage,
            false
          )}
          selected={checking}
          open={params.action === "assign-attribute-value"}
          onToggle={attributeId => {
            const checkHadValues = checking.find(id => id === attributeId);
            if (checkHadValues) {
              setChecking(checking.filter(id => id !== attributeId));
              setAssignAttribute(
                assignAttribute.filter(value => value.id !== attributeId)
              );
            } else {
              const assign: any = mapEdgesToItems(listData.options);
              setChecking([...checking, attributeId]);
              setAssignAttribute([
                ...assignAttribute,
                assign.find(value => value.id === attributeId)
              ]);
            }
          }}
        />
      )}
    </>
  );
};
export default ProductCreateView;
