import { Button, Container } from "@material-ui/core";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, sectionNames } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  useCreateServiceTime,
  useListServiceTime,
  useUpdateServiceTime
} from "../queries";
import ServiceCardComponent from "./ServiceCardComponent";
import ServiceProcessCard from "./ServiceProcessCard";

const data = {
  deliveryService: [
    {
      days: [false, false, false, false, false, false, false],
      open: "0:0",
      close: "23:55"
    }
  ],
  pickupService: [
    {
      days: [false, false, false, false, false, false, false],
      open: "0:0",
      close: "23:55"
    }
  ]
};

const initProcess = {
  deliveryProcess: {
    deliveryTime: 0,
    timePickerGap: 0,
    asSoonAs: false,
    preOrder: false,
    sameDayOrder: false,
    preOrderDay: 1
  },
  pickupProcess: {
    deliveryTime: 0,
    timePickerGap: 0,
    asSoonAs: false,
    preOrder: false,
    sameDayOrder: false,
    preOrderDay: 1
  }
};

function ServiceViewPage() {
  const intl = useIntl();
  const notify = useNotifier();
  const [serviceTime, setServiceTime] = React.useState(data);

  const [serviceProcess, setServiceProcess] = React.useState(initProcess);

  const { data: listService, refetch } = useListServiceTime({
    variables: { first: 10 }
  });

  const [createServiceTime] = useCreateServiceTime({
    onCompleted: data => {
      refetch();
      if (data.serviceTimeCreate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      } else {
        notify({
          status: "error",
          text: intl.formatMessage({
            defaultMessage: "Create Fail! Please Try Again!"
          })
        });
      }
    }
  });

  const [updateServiceTime] = useUpdateServiceTime({
    onCompleted: data => {
      if (data.serviceTimeUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      } else {
        notify({
          status: "error",
          text: intl.formatMessage({
            defaultMessage: "Update Fail! Please Try Again!"
          })
        });
      }
    }
  });

  React.useEffect(() => {
    if (listService) {
      if (listService?.serviceTimes?.edges.length > 0) {
        const dl = JSON.parse(
          listService?.serviceTimes?.edges[0].node.dlServiceTime
        )?.dl;
        const pu = JSON.parse(
          listService?.serviceTimes?.edges[0].node.puServiceTime
        )?.pu;

        const process = {
          deliveryProcess: {
            deliveryTime:
              listService?.serviceTimes?.edges[0].node.dlDeliveryTime,
            timePickerGap: listService?.serviceTimes?.edges[0].node.dlTimeGap,
            asSoonAs:
              listService?.serviceTimes?.edges[0].node.dlAsSoonAsPosible,
            preOrder: listService?.serviceTimes?.edges[0].node.dlAllowPreorder,
            sameDayOrder:
              listService?.serviceTimes?.edges[0].node.dlSameDayOrder,
            preOrderDay: listService?.serviceTimes?.edges[0].node.dlPreorderDay
          },
          pickupProcess: {
            deliveryTime:
              listService?.serviceTimes?.edges[0].node.puDeliveryTime,
            timePickerGap: listService?.serviceTimes?.edges[0].node.puTimeGap,
            asSoonAs:
              listService?.serviceTimes?.edges[0].node.puAsSoonAsPosible,
            preOrder: listService?.serviceTimes?.edges[0].node.puAllowPreorder,
            sameDayOrder:
              listService?.serviceTimes?.edges[0].node.puSameDayOrder,
            preOrderDay: listService?.serviceTimes?.edges[0].node.puPreorderDay
          }
        };
        setServiceTime({
          ...serviceTime,
          deliveryService: dl,
          pickupService: pu
        });

        setServiceProcess(process);
      }
    }
  }, [listService]);

  const input = {
    dlDeliveryTime: serviceProcess.deliveryProcess.deliveryTime,
    dlTimeGap: serviceProcess.deliveryProcess.timePickerGap,
    dlAsSoonAsPosible: serviceProcess.deliveryProcess.asSoonAs,
    dlAllowPreorder: serviceProcess.deliveryProcess.preOrder,
    dlPreorderDay: serviceProcess.deliveryProcess.preOrderDay,
    dlSameDayOrder: serviceProcess.deliveryProcess.sameDayOrder,
    dlServiceTime: JSON.stringify({ dl: serviceTime.deliveryService }),
    puDeliveryTime: serviceProcess.pickupProcess.deliveryTime,
    puTimeGap: serviceProcess.pickupProcess.timePickerGap,
    puAsSoonAsPosible: serviceProcess.pickupProcess.asSoonAs,
    puAllowPreorder: serviceProcess.pickupProcess.preOrder,
    puSameDayOrder: serviceProcess.pickupProcess.sameDayOrder,
    puPreorderDay: serviceProcess.pickupProcess.preOrderDay,
    puServiceTime: JSON.stringify({ pu: serviceTime.pickupService })
  };

  const handleClick = () => {
    let checkErr = false;

    if (listService && listService?.serviceTimes?.edges.length > 0) {
      serviceTime.deliveryService.map(item => {
        if (item.close < item.open) {
          checkErr = true;
        }
      });
      if (checkErr) {
        notify({
          status: "error",
          text: intl.formatMessage({
            defaultMessage: "Update Fail! Please Try Again!"
          })
        });
      } else {
        updateServiceTime({
          variables: {
            input,
            id: listService?.serviceTimes?.edges[0]?.node?.id
          }
        });
      }
    } else {
      serviceTime.deliveryService.map(item => {
        if (item.close < item.open) {
          checkErr = true;
        }
      });
      if (checkErr) {
        notify({
          status: "error",
          text: intl.formatMessage({
            defaultMessage: "Update Fail! Please Try Again!"
          })
        });
      } else {
        createServiceTime({
          variables: {
            input
          }
        });
      }
    }
  };

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.serviceTime)}>
        <Button color="primary" variant="outlined">
          <FormattedMessage defaultMessage="Cancle" description="button" />
        </Button>
        <Button color="primary" variant="contained" onClick={handleClick}>
          <FormattedMessage
            defaultMessage="Save changes"
            description="button"
          />
        </Button>
      </PageHeader>

      <Grid>
        <div>
          <ServiceCardComponent
            titleHead={commonMessages.deliveryService}
            serviceTime={serviceTime}
            type="delivery"
            setServiceTime={setServiceTime}
          />
          <FormSpacer />
          <ServiceCardComponent
            titleHead={commonMessages.pickupService}
            serviceTime={serviceTime}
            setServiceTime={setServiceTime}
            type="pickup"
          />
        </div>

        <div>
          <ServiceProcessCard
            titleHead={commonMessages.deliveryProcess}
            serviceProcess={serviceProcess}
            setServiceProcess={setServiceProcess}
            type="delivery"
          />
          <FormSpacer />
          <ServiceProcessCard
            titleHead={commonMessages.pickupService}
            serviceProcess={serviceProcess}
            setServiceProcess={setServiceProcess}
            type="pickup"
          />
        </div>
      </Grid>
    </Container>
  );
}

export default ServiceViewPage;
