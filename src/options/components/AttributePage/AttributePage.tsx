import { AttributeDetails_attribute_choices } from "@saleor/attributes/types/AttributeDetails";
import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { ListSettingsUpdate } from "@saleor/components/TablePagination";
import { AttributeDetailsFragment } from "@saleor/fragments/types/AttributeDetailsFragment";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { ListSettings, ReorderAction } from "@saleor/types";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { useIntl } from "react-intl";

import AttributeDetails from "../AttributeDetails";
import AttributeValues from "../AttributeValues";

export interface AttributePageProps {
  attribute: AttributeDetailsFragment | null;
  disabled?: boolean;
  errors?: AttributeErrorFragment[];
  saveButtonBarState?: ConfirmButtonTransitionState;
  values: AttributeDetails_attribute_choices;
  onBack: () => void;
  onDelete: () => void;
  onSubmit: (data: AttributePageFormData) => void;
  onValueAdd: () => void;
  onValueDelete: (id: string) => void;
  onValueReorder?: ReorderAction;
  onValueUpdate: (id: string) => void;
  settings?: ListSettings;
  onUpdateListSettings?: ListSettingsUpdate;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export interface AttributePageFormData {
  name: string;
  type: string;
  required: boolean;
  values: [];
}

const AttributePage: React.FC<AttributePageProps> = ({
  attribute,
  disabled,
  errors: apiErrors,
  saveButtonBarState,
  values,
  onBack,
  onDelete,
  onSubmit,
  onValueAdd,
  onValueDelete,
  onValueReorder,
  onValueUpdate,
  settings,
  onUpdateListSettings,
  pageInfo,
  onNextPage,
  onPreviousPage
}) => {
  const intl = useIntl();

  const initialForm: AttributePageFormData =
    attribute === null
      ? {
          name: "",
          type: "",
          required: true,
          values: []
        }
      : {
          name: attribute?.name ?? "",
          type: attribute?.type ?? "",
          required: !!attribute?.required ?? true,
          values: []
        };

  const handleSubmit = (data: AttributePageFormData) =>
    // const type = attribute !== null ? data.type : "";
    onSubmit({
      ...data
    });

  return (
    <Form initial={initialForm} onSubmit={handleSubmit}>
      {({ change, set, data, submit, errors, setError, clearErrors }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.attributes)}
          </AppHeader>
          <PageHeader
            title={
              attribute === null
                ? intl.formatMessage({
                    defaultMessage: "Create New Option",
                    description: "page title"
                  })
                : maybe(() => attribute.name)
            }
          />
          <Grid>
            <div>
              <AttributeDetails
                canChangeType={attribute === null}
                data={data}
                disabled={disabled}
                apiErrors={apiErrors}
                onChange={change}
                set={set}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
              />
              <CardSpacer />
              <AttributeValues
                disabled={disabled}
                values={mapEdgesToItems(values)}
                onValueAdd={onValueAdd}
                onValueDelete={onValueDelete}
                onValueReorder={onValueReorder}
                onValueUpdate={onValueUpdate}
                settings={settings}
                onUpdateListSettings={onUpdateListSettings}
                pageInfo={pageInfo}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
                onChange={change}
              />
              <CardSpacer />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={false}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
            onDelete={attribute === null ? undefined : onDelete}
          />
        </Container>
      )}
    </Form>
  );
};
AttributePage.displayName = "AttributePage";
export default AttributePage;
