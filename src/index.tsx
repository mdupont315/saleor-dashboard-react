import useAppState from "@saleor/hooks/useAppState";
import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
// import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "apollo-utilities";
import React, { useEffect } from "react";
import { ApolloProvider, useLazyQuery } from "react-apollo";
import { useSubscription } from "react-apollo";
import { render } from "react-dom";
import ErrorBoundary from "react-error-boundary";
import TagManager from "react-gtm-module";
import { useIntl } from "react-intl";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactToPrint from "react-to-print";

import AppsSection from "./apps";
import { appsSection } from "./apps/urls";
import AttributeSection from "./attributes";
import { attributeSection } from "./attributes/urls";
import Auth from "./auth";
import AuthProvider, { useAuth } from "./auth/AuthProvider";
import LoginLoading from "./auth/components/LoginLoading/LoginLoading";
import SectionRoute from "./auth/components/SectionRoute";
import authLink from "./auth/link";
import { hasPermission } from "./auth/misc";
import CategorySection from "./categories";
import ChannelsSection from "./channels";
import { channelsSection } from "./channels/urls";
import CollectionSection from "./collections";
import AppLayout from "./components/AppLayout";
import useAppChannel, {
  AppChannelProvider
} from "./components/AppLayout/AppChannelContext";
import { DateProvider } from "./components/Date";
import { LocaleProvider } from "./components/Locale";
import MessageManagerProvider from "./components/messages";
import { ShopProvider } from "./components/Shop";
import ThemeProvider from "./components/Theme";
import { WindowTitle } from "./components/WindowTitle";
import { API_URI, APP_MOUNT_URI, GTM_ID, SOCKET_URI } from "./config";
import ConfigurationSection, { createConfigurationMenu } from "./configuration";
import AppStateProvider from "./containers/AppState";
import BackgroundTasksProvider from "./containers/BackgroundTasks";
import ServiceWorker from "./containers/ServiceWorker/ServiceWorker";
import { CustomerSection } from "./customers";
import DeliverySection from "./delivery";
import DiscountSection from "./discounts";
import EmergencySection from "./emergency";
import HomePage from "./home";
import { commonMessages } from "./intl";
import { SUBSCRIPTION_MESSAGE } from "./mutations";
import NavigationSection from "./navigation";
import { navigationSection } from "./navigation/urls";
import { NotFound } from "./NotFound";
import NotificationSection from "./notifications";
import { notificationSection } from "./notifications/urls";
import OptionSection from "./options";
import { optionSection } from "./options/urls";
import OrderDetail from "./OrderDetail";
import OrdersSection from "./orders";
import { orderFull } from "./orders/queries";
import PageSection from "./pages";
import PageTypesSection from "./pageTypes";
import PaymentSection from "./payments";
import { paymentSection } from "./payments/urls";
import PermissionGroupSection from "./permissionGroups";
import PluginsSection from "./plugins";
import ProductSection from "./products";
import ProductTypesSection from "./productTypes";
import QRcodeSection from "./qrcode";
import errorTracker from "./services/errorTracking";
import ServiceSection from "./servicesTime";
import ShippingSection from "./shipping";
import SiteSettingsSection from "./siteSettings";
import StaffSection from "./staff";
import StoreSection from "./stores";
import TaxesSection from "./taxes";
import TranslationsSection from "./translations";
import { PermissionEnum } from "./types/globalTypes";
import WarehouseSection from "./warehouses";
import { warehouseSection } from "./warehouses/urls";
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID });
}

errorTracker.init();

// DON'T TOUCH THIS
// These are separate clients and do not share configs between themselves
// so we need to explicitly set them
const linkOptions = {
  credentials: "include",
  uri: API_URI
};
const uploadLink = createUploadLink(linkOptions);
const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkOptions
});

const wsLink = new WebSocketLink({
  uri: SOCKET_URI,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.split(
    operation => operation.getContext().useBatching,
    batchLink,
    uploadLink
  )
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (obj: any) => {
      // We need to set manually shop's ID, since it is singleton and
      // API does not return its ID
      if (obj.__typename === "Shop") {
        return "shop";
      }
      return defaultDataIdFromObject(obj);
    }
  }),
  link: authLink.concat(splitLink)
});

const App: React.FC = () => {
  const isDark = localStorage.getItem("theme") === "true";

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename={APP_MOUNT_URI}>
        <ThemeProvider isDefaultDark={isDark}>
          <DateProvider>
            <LocaleProvider>
              <MessageManagerProvider>
                <ServiceWorker />
                <BackgroundTasksProvider>
                  <AppStateProvider>
                    <ShopProvider>
                      <AuthProvider>
                        <AppChannelProvider>
                          <Routes />
                        </AppChannelProvider>
                      </AuthProvider>
                    </ShopProvider>
                  </AppStateProvider>
                </BackgroundTasksProvider>
              </MessageManagerProvider>
            </LocaleProvider>
          </DateProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const PrintComponent = ({ myStore, user }) => {
  const componentRef = React.useRef<any>();

  const [orderDetail, setOrderDetail] = React.useState(null);
  const buttonRef = React.useRef<any>();
  // const { data: myStore } = useGetMyStore({ variables: {} });
  const { data } = useSubscription(SUBSCRIPTION_MESSAGE, {
    variables: { id: myStore?.myStore.id }
  });

  const { messageTitle } = data?.appLiveNotification || {};
  localStorage.setItem("store_id", myStore?.myStore.id);
  const [getOrderFull] = useLazyQuery(orderFull, {
    variables: { orderId: messageTitle || "" },
    fetchPolicy: "no-cache",
    onCompleted: data => {
      // peint here
      setOrderDetail(data.order);
      // console.log(buttonRef);
    }
  });

  useEffect(() => {
    if (user && messageTitle && myStore.myStore.posEnable) {
      getOrderFull();
    }
  }, [messageTitle]);

  useEffect(() => {
    if (orderDetail) {
      if (buttonRef) {
        buttonRef.current.click();
      }
    }
  }, [orderDetail]);

  return (
    <div>
      {/* ------------------------print element */}
      <ReactToPrint
        trigger={() => (
          <div style={{ display: "none" }}>
            <button color="primary" ref={buttonRef}>
              Print
            </button>
          </div>
        )}
        content={() => componentRef.current}
      />
      {/*  style={{ display: "none" }}*/}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          {orderDetail && (
            <OrderDetail orderDetail={orderDetail} myStore={myStore} />
          )}
        </div>
      </div>
    </div>
  );
};

const SoundNotificationComponent = ({ enable }: any) => {
  const soundRef = React.useRef(null);
  const store_id = localStorage.getItem("store_id") || "";

  const { data: dataSocket } = useSubscription(SUBSCRIPTION_MESSAGE, {
    variables: { id: store_id }
  });

  useEffect(() => {
    if (dataSocket && enable) {
      soundRef.current.play();
    }
  }, [dataSocket]);
  return (
    <audio controls ref={soundRef} style={{ display: "none" }}>
      <source
        src="https://orderich-prod.s3.eu-central-1.amazonaws.com/static/sounds/orderich_notification.mp3"
        type="audio/mpeg"
      />
    </audio>
  );
};

const Routes = ({ myStore }: any) => {
  const intl = useIntl();
  const [, dispatchAppState] = useAppState();
  const {
    hasToken,
    isAuthenticated,
    tokenAuthLoading,
    tokenVerifyLoading,
    user
  } = useAuth();
  const { channel } = useAppChannel(false);
  const channelLoaded = typeof channel !== "undefined";

  const homePageLoaded =
    channelLoaded &&
    isAuthenticated &&
    !tokenAuthLoading &&
    !tokenVerifyLoading;

  const homePageLoading =
    (isAuthenticated && !channelLoaded) || (hasToken && tokenVerifyLoading);
  return (
    <>
      {myStore && myStore.myStore && myStore.myStore.id && (
        <>
          <SoundNotificationComponent
            enable={myStore?.myStore?.soundNotifications}
          />
          <PrintComponent user={user} myStore={myStore} />
        </>
      )}
      {/* ------------------------------------------------ */}

      <WindowTitle title={intl.formatMessage(commonMessages.dashboard)} />
      {homePageLoaded ? (
        <AppLayout>
          <ErrorBoundary
            onError={e => {
              const errorId = errorTracker.captureException(e);
              dispatchAppState({
                payload: {
                  error: "unhandled",
                  errorId
                },
                type: "displayError"
              });
            }}
          >
            <Switch>
              <SectionRoute exact path="/" component={HomePage} />
              <SectionRoute path="/stores">
                <StoreSection isAdmin={user.isSuperuser} />
              </SectionRoute>

              <SectionRoute
                path="/services-time"
                roles={["isSupplier", "isStaff"]}
                component={ServiceSection}
              />
              <SectionRoute
                path="/emergency"
                roles={["isSupplier", "isStaff"]}
                component={EmergencySection}
              />
              <SectionRoute
                path="/delivery"
                roles={["isSupplier", "isStaff"]}
                component={DeliverySection}
              />
              <SectionRoute
                path="/qrcode"
                roles={["isSupplier", "isStaff"]}
                component={QRcodeSection}
              />

              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                path="/categories"
                component={CategorySection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                path="/collections"
                component={CollectionSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_USERS]}
                path="/customers"
                component={CustomerSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
                path="/discounts"
                component={DiscountSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_PAGES]}
                path="/pages"
                component={PageSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_PAGES]}
                path="/page-types"
                component={PageTypesSection}
              />
              <SectionRoute
                // roles={["isSuperuser"]}
                permissions={[PermissionEnum.MANAGE_PLUGINS]}
                path="/plugins"
                component={PluginsSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_ORDERS]}
                path="/orders"
                component={OrdersSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                path="/products"
                component={ProductSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[
                  PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES
                ]}
                path="/product-types"
                component={ProductTypesSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_STAFF]}
                path="/staff"
                component={StaffSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_STAFF]}
                path="/permission-groups"
                component={PermissionGroupSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_SETTINGS]}
                path="/site-settings"
                component={SiteSettingsSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_SETTINGS]}
                path="/taxes"
                component={TaxesSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_SHIPPING]}
                path="/shipping"
                component={ShippingSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_TRANSLATIONS]}
                path="/translations"
                component={TranslationsSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_MENUS]}
                path={navigationSection}
                component={NavigationSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[
                  PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES
                ]}
                path={attributeSection}
                component={AttributeSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_APPS]}
                path={appsSection}
                component={AppsSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                path={warehouseSection}
                component={WarehouseSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[PermissionEnum.MANAGE_CHANNELS]}
                path={channelsSection}
                component={ChannelsSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                permissions={[
                  PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES
                ]}
                path={optionSection}
                component={OptionSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                path={notificationSection}
                component={NotificationSection}
              />
              <SectionRoute
                roles={["isSupplier", "isStaff"]}
                path={paymentSection}
                component={PaymentSection}
              />
              {createConfigurationMenu(intl).filter(menu =>
                menu.menuItems.map(item => hasPermission(item.permission, user))
              ).length > 0 && (
                <SectionRoute
                  roles={["isSupplier", "isStaff"]}
                  exact
                  path="/configuration"
                  component={ConfigurationSection}
                />
              )}
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </AppLayout>
      ) : homePageLoading ? (
        <LoginLoading />
      ) : (
        <Auth />
      )}
    </>
  );
};

render(<App />, document.querySelector("#dashboard-app"));
