import { OutputData } from "@editorjs/editorjs";
import {
  getAttributeValuesFromReferences,
  mergeAttributeValues
} from "@saleor/attributes/utils/data";
import { ChannelData } from "@saleor/channels/utils";
import AppHeader from "@saleor/components/AppHeader";
import AssignAttributeValueDialog from "@saleor/components/AssignAttributeValueDialog";
import Attributes, { AttributeInput } from "@saleor/components/Attributes";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
// import Metadata from "@saleor/components/Metadata/Metadata";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
// import SeoForm from "@saleor/components/SeoForm";
import { RefreshLimits_shop_limits } from "@saleor/components/Shop/types/RefreshLimits";
import { ProductChannelListingErrorFragment } from "@saleor/fragments/types/ProductChannelListingErrorFragment";
import { ProductErrorWithAttributesFragment } from "@saleor/fragments/types/ProductErrorWithAttributesFragment";
import { TaxTypeFragment } from "@saleor/fragments/types/TaxTypeFragment";
import { WarehouseFragment } from "@saleor/fragments/types/WarehouseFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { FormsetData } from "@saleor/hooks/useFormset";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import ProductExternalMediaDialog from "@saleor/products/components/ProductExternalMediaDialog";
import ProductVariantPrice from "@saleor/products/components/ProductVariantPrice";
import { ChannelsWithVariantsData } from "@saleor/products/views/ProductUpdate/types";
import { SearchAttributeValues_attribute_choices_edges_node } from "@saleor/searches/types/SearchAttributeValues";
import { SearchCategories_search_edges_node } from "@saleor/searches/types/SearchCategories";
import { SearchCollections_search_edges_node } from "@saleor/searches/types/SearchCollections";
import { SearchPages_search_edges_node } from "@saleor/searches/types/SearchPages";
import { SearchProducts_search_edges_node } from "@saleor/searches/types/SearchProducts";
import {
  ChannelProps,
  FetchMoreProps,
  ListActions,
  ReorderAction
} from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";

import {
  ProductDetails_product,
  ProductDetails_product_media,
  ProductDetails_product_variants
} from "../../types/ProductDetails";
import { getChoices, ProductUpdatePageFormData } from "../../utils/data";
import ProductDetailsForm from "../ProductDetailsForm";
import ProductMedia from "../ProductMedia";
import ProductOrganization from "../ProductOrganization";
import { ProductStockInput } from "../ProductStocks";
import ProductTypeAttributes from "../ProductTypeAttributes";
import ProductVariants from "../ProductVariants";
import ProductUpdateForm, {
  ProductUpdateData,
  ProductUpdateHandlers
} from "./form";

export interface ProductUpdatePageProps extends ListActions, ChannelProps {
  channelsWithVariantsData: ChannelsWithVariantsData;
  setChannelsData: (data: ChannelData[]) => void;
  onChannelsChange: (data: ChannelData[]) => void;
  channelsData: ChannelData[];
  currentChannels: ChannelData[];
  values?: any;
  isCheckedOption?: any;
  allChannelsCount: number;
  channelsErrors: ProductChannelListingErrorFragment[];
  defaultWeightUnit: string;
  errors: ProductErrorWithAttributesFragment[];
  placeholderImage: string;
  collections: SearchCollections_search_edges_node[];
  categories: SearchCategories_search_edges_node[];
  attributeValues: SearchAttributeValues_attribute_choices_edges_node[];
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  isMediaUrlModalVisible?: boolean;
  limits: RefreshLimits_shop_limits;
  variants: ProductDetails_product_variants[];
  media: ProductDetails_product_media[];
  hasChannelChanged: boolean;
  product: ProductDetails_product;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouses: WarehouseFragment[];
  taxTypes: TaxTypeFragment[];
  referencePages?: SearchPages_search_edges_node[];
  referenceProducts?: SearchProducts_search_edges_node[];
  assignReferencesAttributeId?: string;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchMoreAttributeValues?: FetchMoreProps;
  isSimpleProduct: boolean;
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  onCloseDialog: () => void;
  onVariantsAdd: () => void;
  onVariantShow: (id: string) => () => void;
  onVariantReorder: ReorderAction;
  onImageDelete: (id: string) => () => void;
  onSubmit: (data: ProductUpdatePageSubmitData) => SubmitPromise;
  onAttributeUnassignAll?: () => void;
  onAttributeUnassign?: (id: string) => void;
  onToggle?: (id: string) => void;
  onToggleAll?: () => void;
  onAttributeAdd?: () => void;
  openChannelsModal: () => void;
  onProductOptionsReorder?: ReorderAction;
  onBack?();
  onDelete();
  onImageEdit?(id: string);
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  onMediaUrlUpload(mediaUrl: string);
  onSeoClick?();
  onVariantAdd?();
  onSetDefaultVariant(variant: ProductDetails_product_variants);
  onWarehouseConfigure();
}

export interface ProductUpdatePageSubmitData extends ProductUpdatePageFormData {
  addStocks: ProductStockInput[];
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  collections: string[];
  description: OutputData;
  removeStocks: string[];
  updateStocks: ProductStockInput[];
  options: string[];
}

export const ProductUpdatePage: React.FC<ProductUpdatePageProps> = ({
  disabled,
  categories: categoryChoiceList,
  channelsErrors,
  collections: collectionChoiceList,
  attributeValues,
  isSimpleProduct,
  errors,
  fetchCategories,
  fetchCollections,
  fetchMoreCategories,
  fetchMoreCollections,
  media,
  hasChannelChanged,
  header,
  limits,
  placeholderImage,
  product,
  saveButtonBarState,
  variants,
  warehouses,
  setChannelsData,
  taxTypes,
  referencePages = [],
  referenceProducts = [],
  onBack,
  onDelete,
  currentChannels,
  onImageDelete,
  onImageEdit,
  onImageReorder,
  onImageUpload,
  onMediaUrlUpload,
  // onSeoClick,
  onSubmit,
  onVariantAdd,
  channelsData,
  onVariantsAdd,
  onSetDefaultVariant,
  onVariantShow,
  onVariantReorder,
  isChecked,
  isMediaUrlModalVisible,
  selected,
  selectedChannelId,
  toggle,
  toggleAll,
  toolbar,
  assignReferencesAttributeId,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceProducts,
  fetchMoreReferenceProducts,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  values,
  onCloseDialog,
  channelsWithVariantsData,
  onChannelsChange,
  onAttributeAdd,
  onAttributeUnassign,
  onAttributeUnassignAll,
  onToggle,
  onToggleAll,
  onProductOptionsReorder,
  isCheckedOption
}) => {
  const intl = useIntl();

  const [selectedCategory, setSelectedCategory] = useStateFromProps(
    product?.category?.name || ""
  );

  const [mediaUrlModalStatus, setMediaUrlModalStatus] = useStateFromProps(
    isMediaUrlModalVisible || false
  );

  const [selectedCollections, setSelectedCollections] = useStateFromProps(
    getChoices(maybe(() => product.collections, []))
  );

  const categories = getChoices(categoryChoiceList);
  const collections = getChoices(collectionChoiceList);
  const hasVariants = product?.productType?.hasVariants;
  const taxTypeChoices =
    taxTypes?.map(taxType => ({
      label: taxType.description,
      value: taxType.taxCode
    })) || [];

  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  const handleAssignReferenceAttribute = (
    attributeValues: string[],
    data: ProductUpdateData,
    handlers: ProductUpdateHandlers
  ) => {
    handlers.selectAttributeReference(
      assignReferencesAttributeId,
      mergeAttributeValues(
        assignReferencesAttributeId,
        attributeValues,
        data.attributes
      )
    );
    onCloseDialog();
  };

  return (
    <ProductUpdateForm
      isSimpleProduct={isSimpleProduct}
      currentChannels={currentChannels}
      channelsData={channelsData}
      setChannelsData={setChannelsData}
      onSubmit={onSubmit}
      product={product}
      categories={categories}
      collections={collections}
      channelsWithVariants={channelsWithVariantsData}
      selectedCollections={selectedCollections}
      setSelectedCategory={setSelectedCategory}
      setSelectedCollections={setSelectedCollections}
      setSelectedTaxType={null}
      setChannels={onChannelsChange}
      taxTypes={taxTypeChoices}
      warehouses={warehouses}
      options={values.map(value => value.id)}
      hasVariants={hasVariants}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceProducts={fetchReferenceProducts}
      fetchMoreReferenceProducts={fetchMoreReferenceProducts}
      assignReferencesAttributeId={assignReferencesAttributeId}
    >
      {({
        change,
        data,
        // disabled: formDisabled,
        handlers,
        hasChanged,
        submit
      }) => (
        <>
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.products)}
            </AppHeader>
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onDescriptionChange={handlers.changeDescription}
                  onChange={change}
                />
                <CardSpacer />
                <ProductTypeAttributes
                  attributes={maybe(() => values)}
                  isChecked={isCheckedOption}
                  toggle={onToggle}
                  toggleAll={onToggleAll}
                  onAttributeAssign={() => {
                    onAttributeAdd();
                    handlers.handlerAttribute();
                  }}
                  onAttributeUnassign={(id: string) => {
                    onAttributeUnassign(id);
                    handlers.handlerAttribute();
                  }}
                  onAttributeUnassignAll={() => {
                    onAttributeUnassignAll();
                    handlers.handlerAttribute();
                  }}
                  onAttributeReorder={onProductOptionsReorder}
                />
                <CardSpacer />
                <ProductMedia
                  media={media}
                  placeholderImage={placeholderImage}
                  onImageDelete={onImageDelete}
                  onImageReorder={onImageReorder}
                  onImageEdit={onImageEdit}
                  onImageUpload={onImageUpload}
                  openMediaUrlModal={() => setMediaUrlModalStatus(true)}
                />
                <CardSpacer />
                {data.attributes.length > 0 && (
                  <Attributes
                    attributes={data.attributes}
                    attributeValues={attributeValues}
                    errors={errors}
                    loading={disabled}
                    disabled={disabled}
                    onChange={handlers.selectAttribute}
                    onMultiChange={handlers.selectAttributeMultiple}
                    onFileChange={handlers.selectAttributeFile}
                    onReferencesRemove={handlers.selectAttributeReference}
                    onReferencesAddClick={onAssignReferencesClick}
                    onReferencesReorder={handlers.reorderAttributeValue}
                    fetchAttributeValues={fetchAttributeValues}
                    fetchMoreAttributeValues={fetchMoreAttributeValues}
                  />
                )}
                <CardSpacer />
                {isSimpleProduct && (
                  <>
                    <ProductVariantPrice
                      ProductVariantChannelListings={data.channelListings}
                      errors={channelsErrors}
                      loading={disabled}
                      onChange={handlers.changeChannelPrice}
                    />
                    <CardSpacer />
                  </>
                )}
                {hasVariants ? (
                  <ProductVariants
                    disabled={disabled}
                    limits={limits}
                    variants={variants}
                    product={product}
                    onRowClick={onVariantShow}
                    onVariantAdd={onVariantAdd}
                    onVariantsAdd={onVariantsAdd}
                    onVariantReorder={onVariantReorder}
                    onSetDefaultVariant={onSetDefaultVariant}
                    toolbar={toolbar}
                    isChecked={isChecked}
                    selected={selected}
                    selectedChannelId={selectedChannelId}
                    toggle={toggle}
                    toggleAll={toggleAll}
                  />
                ) : (
                  <></>
                )}
                <CardSpacer />
                {/* <SeoForm
                  errors={errors}
                  title={data.seoTitle}
                  titlePlaceholder={data.name}
                  description={data.seoDescription}
                  descriptionPlaceholder={""} // TODO: cast description to string
                  slug={data.slug}
                  slugPlaceholder={data.name}
                  loading={disabled}
                  onClick={onSeoClick}
                  onChange={change}
                  helperText={intl.formatMessage({
                    defaultMessage:
                      "Add search engine title and description to make this product easier to find"
                  })}
                /> */}
                {/* <CardSpacer />
                <Metadata data={data} onChange={handlers.changeMetadata} /> */}
              </div>
              <div>
                <ProductOrganization
                  canChangeType={false}
                  categories={categories}
                  categoryInputDisplayValue={selectedCategory}
                  collections={collections}
                  collectionsInputDisplayValue={selectedCollections}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  fetchCategories={fetchCategories}
                  fetchCollections={fetchCollections}
                  fetchMoreCategories={fetchMoreCategories}
                  fetchMoreCollections={fetchMoreCollections}
                  productType={product?.productType}
                  onCategoryChange={handlers.selectCategory}
                  onCollectionChange={handlers.selectCollection}
                />
                <CardSpacer />
              </div>
            </Grid>
            <SaveButtonBar
              onCancel={onBack}
              onDelete={onDelete}
              onSave={submit}
              state={saveButtonBarState}
              // disabled={false}
              disabled={disabled || (!hasChanged && !hasChannelChanged)}
            />
            {canOpenAssignReferencesAttributeDialog && (
              <AssignAttributeValueDialog
                attributeValues={getAttributeValuesFromReferences(
                  assignReferencesAttributeId,
                  data.attributes,
                  referencePages,
                  referenceProducts
                )}
                hasMore={handlers.fetchMoreReferences?.hasMore}
                open={canOpenAssignReferencesAttributeDialog}
                onFetch={handlers.fetchReferences}
                onFetchMore={handlers.fetchMoreReferences?.onFetchMore}
                loading={handlers.fetchMoreReferences?.loading}
                onClose={onCloseDialog}
                onSubmit={attributeValues =>
                  handleAssignReferenceAttribute(
                    attributeValues,
                    data,
                    handlers
                  )
                }
              />
            )}

            <ProductExternalMediaDialog
              product={product}
              onClose={() => setMediaUrlModalStatus(false)}
              open={mediaUrlModalStatus}
              onSubmit={onMediaUrlUpload}
            />
          </Container>
        </>
      )}
    </ProductUpdateForm>
  );
};
ProductUpdatePage.displayName = "ProductUpdatePage";
export default ProductUpdatePage;
