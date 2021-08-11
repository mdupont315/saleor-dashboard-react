/* eslint-disable local-rules/named-styles */
import { Container, makeStyles, Typography } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
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
  ],
  tableService: [
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

const useStyles = makeStyles(theme => ({
  configurationCategory: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    borderTop: `solid 1px ${theme.palette.divider}`,
    display: "grid",
    gridColumnGap: theme.spacing(4) + "px",
    gridTemplateColumns: "1fr 3fr",
    paddingTop: theme.spacing(3)
  },
  configurationLabel: {
    paddingBottom: 20
  }
}));

function ServiceViewPage() {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const [serviceTime, setServiceTime] = React.useState(data);
  const classes = useStyles();
  const [serviceProcess, setServiceProcess] = React.useState(initProcess);

  // console.log(serviceTime);

  // console.log(serviceProcess);

  const { data: listService, refetch } = useListServiceTime({
    variables: { first: 10 }
  });

  const ids = listService && JSON.parse(JSON.stringify(listService));

  const [createServiceTime] = useCreateServiceTime({
    onCompleted: data => {
      refetch();
      if (data.serviceTimeCreate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
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

  const [updateServiceTime, updateServiceTimeOpts] = useUpdateServiceTime({
    onCompleted: data => {
      if (data.serviceTimeUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
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
        const tb = JSON.parse(
          listService?.serviceTimes?.edges[0].node.tableServiceTime
        )?.tb;

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
          pickupService: pu,
          tableService: tb
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
    puPreorderDay: serviceProcess.pickupProcess.preOrderDay,
    puSameDayOrder: serviceProcess.pickupProcess.sameDayOrder,
    puServiceTime: JSON.stringify({ pu: serviceTime.pickupService }),
    tableServiceTime: JSON.stringify({ tb: serviceTime.tableService })
  };

  const handleClick = () => {
    let checkErr = false;

    if (listService && listService?.serviceTimes?.edges.length > 0) {
      serviceTime.deliveryService.map(item => {
        if (item.close < item.open) {
          checkErr = true;
        }
      });
      serviceTime.pickupService.map(item => {
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

  const compareStatus = input => {
    delete ids?.serviceTimes?.edges[0].node.id;
    delete ids?.serviceTimes?.edges[0].node.__typename;
    const comapareValue = { ...ids?.serviceTimes?.edges[0].node };
    const data =
      ids &&
      Object.assign(comapareValue, {
        dlServiceTime: ids?.serviceTimes?.edges[0].node.dlServiceTime.replace(
          /\s/g,
          ""
        ),
        puServiceTime: ids?.serviceTimes?.edges[0].node.puServiceTime.replace(
          /\s/g,
          ""
        ),
        talbleServiceTime: ids?.serviceTimes?.edges[0].node.tableServiceTime.replace(
          /\s/g,
          ""
        )
      });

    return JSON.stringify(data) === JSON.stringify(input);
  };

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.serviceTime)} />

      <div className={classes.configurationCategory}>
        <div className={classes.configurationLabel}>
          <Typography>
            <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}>
              Delivery order Settings
            </h2>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}>
              Determine when and how your customers can place delivery orders.
            </p>
          </Typography>
        </div>
        <div>
          <ServiceCardComponent
            titleHead={commonMessages.deliveryService}
            serviceTime={serviceTime}
            type="delivery"
            setServiceTime={setServiceTime}
          />
          <CardSpacer />
          <ServiceProcessCard
            titleHead={commonMessages.deliveryProcess}
            serviceProcess={serviceProcess}
            setServiceProcess={setServiceProcess}
            type="delivery"
          />
        </div>
      </div>
      <FormSpacer />

      <div className={classes.configurationCategory}>
        <div className={classes.configurationLabel}>
          <Typography>
            <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}>
              Pickup Order Settings
            </h2>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}>
              Determine when and how your customers can place pickup orders.
            </p>
          </Typography>
        </div>
        <div>
          <ServiceCardComponent
            titleHead={commonMessages.pickupService}
            serviceTime={serviceTime}
            setServiceTime={setServiceTime}
            type="pickup"
          />
          <CardSpacer />
          <ServiceProcessCard
            titleHead={commonMessages.pickupService}
            serviceProcess={serviceProcess}
            setServiceProcess={setServiceProcess}
            type="pickup"
          />
        </div>
      </div>
      <FormSpacer />

      <div className={classes.configurationCategory}>
        <div className={classes.configurationLabel}>
          <Typography>
            <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#3d3d3d" }}>
              QR Order Settings
            </h2>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#3d3d3d" }}>
              Determine when and how your customers can place QR orders.
            </p>
          </Typography>
        </div>
        <div>
          <ServiceCardComponent
            titleHead={commonMessages.qrService}
            serviceTime={serviceTime}
            setServiceTime={setServiceTime}
            type="table"
          />
        </div>
      </div>
      <FormSpacer />

      {Object.keys(serviceProcess).length > 0 && (
        <SaveButtonBar
          disabled={compareStatus(input)}
          state={updateServiceTimeOpts.status}
          onSave={handleClick}
          onCancel={() => navigate("/configuration")}
        />
      )}
    </Container>
  );
}

export default ServiceViewPage;
