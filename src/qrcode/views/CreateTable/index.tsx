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

function TableCreateViewComponent({ id, params }: IProps) {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  // const t = window.location.origin;
  // t.splice(-1, 1);

  const [createTable] = useMutation(createTableMutation, {
    onCompleted: data => {
      if (data?.tableServiceCreate?.errors.length > 0) {
        notify({
          status: "error",
          text: data?.tableServiceCreate?.errors[0]?.message
        });
      } else {
        const { id, tableName } = data?.tableServiceCreate?.tableService;

        updateTable({
          variables: {
            id,
            input: {
              tableQrCode: `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${window.location.origin}/?qr=${id}`,
              tableName
            }
          }
        });

        // notify({
        //   status: "success",
        //   text: intl.formatMessage(commonMessages.savedChanges)
        // });
        // navigate(qrListUrl());
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
        navigate(qrListUrl());
      }
    }
  });
  const handleSubmit = values => {
    // console.log(values);

    if (!id) {
      createTable({
        variables: {
          input: {
            tableName: values.tableName,
            tableQrCode: values.tableQrCode,
            active: values.active
          }
        }
      });
    } else {
      updateTable({
        variables: {
          id,
          input: {
            tableName: values.tableName,
            // tableQrCode: values.tableQrCode,
            active: values.active
          }
        }
      });
    }
  };
  if (id) {
    const { data, loading, refetch } = useGetTableDetail({
      displayLoader: true,
      variables: {
        id
      }
    });
    if (loading) {
      refetch();
    }
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
            params={params}
            data={maybe(() => data?.tableService)}
            onSubmit={handleSubmit}
            saveButtonBarState="default"
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <WindowTitle
          title={intl.formatMessage({
            defaultMessage: "Create QR code",
            description: "window title"
          })}
        />
        <TableCreatePage
          saveButtonBarState="default"
          onBack={() => navigate(qrListUrl())}
          onSubmit={handleSubmit}
        />
      </>
    );
  }
}

export default TableCreateViewComponent;
