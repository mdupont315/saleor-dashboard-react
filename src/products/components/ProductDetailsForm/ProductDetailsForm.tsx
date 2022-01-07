import { OutputData } from "@editorjs/editorjs";
import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import RichTextEditor, {
  RichTextEditorChange
} from "@saleor/components/RichTextEditor";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { FormsetChange } from "@saleor/hooks/useFormset";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import React from "react";
import { useIntl } from "react-intl";
// import useNotifier from "@saleor/hooks/useNotifier";
interface ProductDetailsFormProps {
  data: {
    description: OutputData;
    name: string;
    rating: number;
    sku?: any;
  };
  disabled?: boolean;
  errors: ProductErrorFragment[];
  onDescriptionChange: RichTextEditorChange;
  onChangeStock?: FormsetChange;
  onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  errors,
  onDescriptionChange,
  onChange
}) => {
  const intl = useIntl();
  // const notify = useNotifier();
  const [canEnableProduct, setCanEnableProduct] = React.useState(true);

  const formErrors = getFormErrors(
    ["name", "description", "rating", "sku"],
    errors
  );

  /* 
    Call graphQL UPDATE ENABLE PRODUCT
  */
  // const [enableProduct] = useMutation(enableProductMutation, {
  //   onCompleted: data => {
  //     if (data.enableProduct.errors.length === 0) {

  //     } else {

  //     }
  //   },
  //   onError: err => {
  //     console.log(err);
  //   }
  // });

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <ControlledSwitch
          name="e_enable_product"
          label={`Enable this product`}
          checked={canEnableProduct}
          onChange={() => setCanEnableProduct(!canEnableProduct)}
        />
        <FormSpacer />

        <TextField
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, intl)}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Name",
            description: "product name"
          })}
          name="name"
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <RichTextEditor
          data={data.description}
          disabled={disabled}
          error={!!formErrors.description}
          helperText={getProductErrorMessage(formErrors.description, intl)}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onDescriptionChange}
        />
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <Grid variant="uniform">
          <TextField
            error={!!formErrors.sku}
            helperText={getProductErrorMessage(formErrors.sku, intl)}
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "SKU (Stock Keeping Unit)",
              description: "product rating"
            })}
            name="sku"
            // required
            value={data.sku || ""}
            onChange={e => {
              onChange(e);
            }}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;
