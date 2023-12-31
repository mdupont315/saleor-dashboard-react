import {
  AttributeInput,
  AttributeInputData
} from "@saleor/components/Attributes";
import { FileUpload } from "@saleor/files/types/FileUpload";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { SelectedVariantAttributeFragment } from "@saleor/fragments/types/SelectedVariantAttributeFragment";
import { UploadErrorFragment } from "@saleor/fragments/types/UploadErrorFragment";
import { FormsetData } from "@saleor/hooks/useFormset";
import { PageDetails_page_attributes } from "@saleor/pages/types/PageDetails";
import { ProductDetails_product_attributes } from "@saleor/products/types/ProductDetails";
import { SearchPages_search_edges_node } from "@saleor/searches/types/SearchPages";
import { SearchProducts_search_edges_node } from "@saleor/searches/types/SearchProducts";
import {
  AttributeEntityTypeEnum,
  AttributeInputTypeEnum,
  AttributeValueInput
} from "@saleor/types/globalTypes";
import {
  mapEdgesToItems,
  mapNodeToChoice,
  mapPagesToChoices
} from "@saleor/utils/maps";
import { MutationFetchResult } from "react-apollo";

import { AttributePageFormData } from "../components/AttributePage";
import { AttributeValueDelete } from "../types/AttributeValueDelete";
import { AttributeCreateValueEditDialogFormData } from "../views/AttributeCreate/AttributeCreate";

export const ATTRIBUTE_TYPES_WITH_DEDICATED_VALUES = [
  AttributeInputTypeEnum.DROPDOWN,
  AttributeInputTypeEnum.MULTISELECT
];

export const ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION = [
  AttributeInputTypeEnum.DROPDOWN,
  AttributeInputTypeEnum.MULTISELECT,
  AttributeInputTypeEnum.BOOLEAN
];

export interface AttributeReference {
  label: string;
  value: string;
}

function getSimpleAttributeData(
  data: AttributePageFormData,
  values: AttributeCreateValueEditDialogFormData[]
) {
  return {
    ...data,
    values: values.map(value => value)
  };
}
/*
function getFileOrReferenceAttributeData(
  data: AttributePageFormData,
  values: AttributeValueEditDialogFormData[]
) {
  return {
    ...getSimpleAttributeData(data, values),
    availableInGrid: undefined,
    filterableInDashboard: undefined,
    filterableInStorefront: undefined
  };
}
*/

export function getAttributeData(
  data: AttributePageFormData,
  values: AttributeCreateValueEditDialogFormData[]
) {
  return getSimpleAttributeData(data, values);
}

export function getSelectedAttributeValues(
  attribute:
    | PageDetails_page_attributes
    | ProductDetails_product_attributes
    | SelectedVariantAttributeFragment
) {
  switch (attribute.attribute.inputType) {
    case AttributeInputTypeEnum.REFERENCE:
      return attribute.values.map(value => value.reference);

    case AttributeInputTypeEnum.RICH_TEXT:
      return [attribute.values[0]?.richText];

    case AttributeInputTypeEnum.NUMERIC:
      return [attribute.values[0]?.name];

    case AttributeInputTypeEnum.BOOLEAN:
      return [attribute.values[0]?.boolean ?? "false"];

    default:
      return attribute.values.map(value => value.slug);
  }
}

export const isFileValueUnused = (
  attributesWithNewFileValue: FormsetData<null, File>,
  existingAttribute:
    | PageDetails_page_attributes
    | ProductDetails_product_attributes
    | SelectedVariantAttributeFragment
) => {
  if (existingAttribute.attribute.inputType !== AttributeInputTypeEnum.FILE) {
    return false;
  }
  if (existingAttribute.values.length === 0) {
    return false;
  }

  const modifiedAttribute = attributesWithNewFileValue.find(
    dataAttribute => dataAttribute.id === existingAttribute.attribute.id
  );

  return !!modifiedAttribute;
};

export const mergeFileUploadErrors = (
  uploadFilesResult: Array<MutationFetchResult<FileUpload>>
): UploadErrorFragment[] =>
  uploadFilesResult.reduce((errors, uploadFileResult) => {
    const uploadErrors = uploadFileResult?.data?.fileUpload?.errors;
    if (uploadErrors) {
      return [...errors, ...uploadErrors];
    }
    return errors;
  }, []);

export const mergeAttributeValueDeleteErrors = (
  deleteAttributeValuesResult: Array<MutationFetchResult<AttributeValueDelete>>
): AttributeErrorFragment[] =>
  deleteAttributeValuesResult.reduce((errors, deleteValueResult) => {
    const deleteErrors = deleteValueResult?.data?.attributeValueDelete?.errors;
    if (deleteErrors) {
      return [...errors, ...deleteErrors];
    }
    return errors;
  }, []);

export const mergeChoicesWithValues = (
  attribute:
    | ProductDetails_product_attributes
    | PageDetails_page_attributes
    | SelectedVariantAttributeFragment
) => {
  const choices = mapEdgesToItems(attribute.attribute.choices);
  const valuesToConcat = attribute.values.filter(
    value => !choices.some(choice => choice.id === value.id)
  );

  return choices.concat(valuesToConcat);
};

export const mergeAttributeValues = (
  attributeId: string,
  attributeValues: string[],
  attributes: FormsetData<AttributeInputData, string[]>
) => {
  const attribute = attributes.find(attribute => attribute.id === attributeId);

  return attribute.value
    ? [...attribute.value, ...attributeValues]
    : attributeValues;
};

export const getFileValuesToUploadFromAttributes = (
  attributesWithNewFileValue: FormsetData<null, File>
) => attributesWithNewFileValue.filter(fileAttribute => !!fileAttribute.value);

export const getFileValuesRemovedFromAttributes = (
  attributesWithNewFileValue: FormsetData<null, File>
) => attributesWithNewFileValue.filter(attribute => !attribute.value);

export const getAttributesOfRemovedFiles = (
  fileAttributesRemoved: FormsetData<null, File>
) =>
  fileAttributesRemoved.map(attribute => ({
    file: undefined,
    id: attribute.id,
    values: []
  }));

export const getAttributesOfUploadedFiles = (
  fileValuesToUpload: FormsetData<null, File>,
  uploadFilesResult: Array<MutationFetchResult<FileUpload>>
) =>
  uploadFilesResult.map((uploadFileResult, index) => {
    const attribute = fileValuesToUpload[index];

    return {
      file: uploadFileResult.data.fileUpload.uploadedFile.url,
      id: attribute.id,
      values: []
    };
  });

export const getAttributesAfterFileAttributesUpdate = (
  attributesWithNewFileValue: FormsetData<null, File>,
  uploadFilesResult: Array<MutationFetchResult<FileUpload>>
): AttributeValueInput[] => {
  const removedFileValues = getFileValuesRemovedFromAttributes(
    attributesWithNewFileValue
  );
  const fileValuesToUpload = getFileValuesToUploadFromAttributes(
    attributesWithNewFileValue
  );

  const removedFileAttributes = getAttributesOfRemovedFiles(removedFileValues);
  const uploadedFileAttributes = getAttributesOfUploadedFiles(
    fileValuesToUpload,
    uploadFilesResult
  );

  return uploadedFileAttributes.concat(removedFileAttributes);
};

export const getFileAttributeDisplayData = (
  attribute: AttributeInput,
  attributesWithNewFileValue: FormsetData<null, File>
) => {
  const attributeWithNewFileValue = attributesWithNewFileValue.find(
    attributeWithNewFile => attribute.id === attributeWithNewFile.id
  );

  if (attributeWithNewFileValue) {
    return {
      ...attribute,
      value: attributeWithNewFileValue?.value?.name
        ? [attributeWithNewFileValue.value.name]
        : []
    };
  }
  return attribute;
};

export const getPageReferenceAttributeDisplayData = (
  attribute: AttributeInput,
  referencePages: SearchPages_search_edges_node[]
) => ({
  ...attribute,
  data: {
    ...attribute.data,
    references:
      referencePages?.length > 0 && attribute.value?.length > 0
        ? mapPagesToChoices(
            attribute.value.map(value => {
              const reference = referencePages.find(
                reference => reference.id === value
              );
              return { ...reference };
            })
          )
        : []
  }
});

export const getProductReferenceAttributeDisplayData = (
  attribute: AttributeInput,
  referenceProducts: SearchProducts_search_edges_node[]
) => ({
  ...attribute,
  data: {
    ...attribute.data,
    references:
      referenceProducts?.length > 0 && attribute.value?.length > 0
        ? mapNodeToChoice(
            attribute.value.map(value => {
              const reference = referenceProducts.find(
                reference => reference.id === value
              );
              return { ...reference };
            })
          )
        : []
  }
});

export const getReferenceAttributeDisplayData = (
  attribute: AttributeInput,
  referencePages: SearchPages_search_edges_node[],
  referenceProducts: SearchProducts_search_edges_node[]
) => {
  if (attribute.data.entityType === AttributeEntityTypeEnum.PAGE) {
    return getPageReferenceAttributeDisplayData(attribute, referencePages);
  } else if (attribute.data.entityType === AttributeEntityTypeEnum.PRODUCT) {
    return getProductReferenceAttributeDisplayData(
      attribute,
      referenceProducts
    );
  }
};

export const getAttributesDisplayData = (
  attributes: AttributeInput[],
  attributesWithNewFileValue: FormsetData<null, File>,
  referencePages: SearchPages_search_edges_node[],
  referenceProducts: SearchProducts_search_edges_node[]
) =>
  attributes.map(attribute => {
    if (attribute.data.inputType === AttributeInputTypeEnum.REFERENCE) {
      return getReferenceAttributeDisplayData(
        attribute,
        referencePages,
        referenceProducts
      );
    }
    if (attribute.data.inputType === AttributeInputTypeEnum.FILE) {
      return getFileAttributeDisplayData(attribute, attributesWithNewFileValue);
    }
    return attribute;
  });

export const getSelectedReferencesFromAttribute = <
  Node extends SearchPages_search_edges_node | SearchProducts_search_edges_node
>(
  attribute?: AttributeInput,
  references?: Node[]
) =>
  references?.filter(
    value =>
      !attribute?.value?.some(selectedValue => selectedValue === value.id)
  ) || [];

export const getAttributeValuesFromReferences = (
  attributeId: string,
  attributes?: AttributeInput[],
  referencePages?: SearchPages_search_edges_node[],
  referenceProducts?: SearchProducts_search_edges_node[]
) => {
  const attribute = attributes?.find(attribute => attribute.id === attributeId);

  if (attribute?.data?.entityType === AttributeEntityTypeEnum.PAGE) {
    return mapPagesToChoices(
      getSelectedReferencesFromAttribute(attribute, referencePages)
    );
  } else if (attribute?.data?.entityType === AttributeEntityTypeEnum.PRODUCT) {
    return mapNodeToChoice(
      getSelectedReferencesFromAttribute(attribute, referenceProducts)
    );
  }
  return [];
};
