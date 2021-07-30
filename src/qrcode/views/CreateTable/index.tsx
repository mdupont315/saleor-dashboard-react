import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import TableCreatePage from "@saleor/qrcode/components/TableCreatePage";
import {
  createTableMutation,
  updateTableMutation,
  useGetTableDetail
} from "@saleor/qrcode/queries";
import { qrListUrl, QRUrlQueryParams } from "@saleor/qrcode/urls";
import React from "react";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";

interface IProps {
  id?: string;
  params?: QRUrlQueryParams;
}

function TableCreateViewComponent({ id }: IProps) {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const [createTable] = useMutation(createTableMutation, {
    onCompleted: data => {
      if (data?.tableServiceCreate?.errors.length > 0) {
        notify({
          status: "error",
          text: data?.tableServiceCreate?.errors[0]?.message
        });
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
    }
  });

  const [updateTable] = useMutation(updateTableMutation, {
    onCompleted: data => {
      if (data?.tableServiceUpdate?.errors.length > 0) {
        notify({
          status: "error",
          text: data?.tableServiceUpdate?.errors[0]?.message
        });
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
    }
  });
  const handleSubmit = values => {
    if (!id) {
      createTable({
        variables: {
          input: {
            tableName: values.tableName,
            tableQrCode: values.tableQrCode
          }
        }
      });
    } else {
      updateTable({
        variables: {
          id,
          input: {
            tableName: values.tableName,
            tableQrCode: values.tableQrCode
          }
        }
      });
    }
  };
  if (id) {
    const { data } = useGetTableDetail({
      displayLoader: true,
      variables: {
        id
      }
    });
    return (
      <>
        <WindowTitle
          title={intl.formatMessage({
            defaultMessage: "QRcode Detail",
            description: "window title"
          })}
        />
        {data && (
          <TableCreatePage
            onBack={() => navigate(qrListUrl())}
            id={id}
            data={maybe(() => data?.tableService)}
            onSubmit={handleSubmit}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <WindowTitle
          title={intl.formatMessage({
            defaultMessage: "Create QRcode",
            description: "window title"
          })}
        />
        <TableCreatePage
          onBack={() => navigate(qrListUrl())}
          onSubmit={handleSubmit}
        />
      </>
    );
  }
}

export default TableCreateViewComponent;
