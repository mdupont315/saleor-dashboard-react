import { Container } from "@material-ui/core";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import PayemntProcess from "./PaymentProcessCard";

function PaymentViewPage() {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.serviceTime)} />
      <Grid>
        <div>
          <PayemntProcess />
        </div>
      </Grid>
    </Container>
  );
}

export default PaymentViewPage;
