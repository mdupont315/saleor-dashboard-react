import { Container } from "@material-ui/core";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import NotificationProcess from "./NotificationProcessCard";

function NotificationViewPage() {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.Notification)} />
      <Grid>
        <div>
          <NotificationProcess />
        </div>
      </Grid>
    </Container>
  );
}

export default NotificationViewPage;
