/* eslint-disable simple-import-sort/sort */
// import { channelsListUrl } from "@saleor/channels/urls";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { deliverySection } from "@saleor/delivery/urls";
import useNavigator from "@saleor/hooks/useNavigator";
import useUser from "@saleor/hooks/useUser";
import Attributes from "@saleor/icons/Attributes";
// import Channels from "@saleor/icons/Channels";
import PermissionGroups from "@saleor/icons/PermissionGroups";
import Plugins from "@saleor/icons/Plugins";
import ProductTypes from "@saleor/icons/ProductTypes";
import ShippingMethods from "@saleor/icons/ShippingMethods";
import SiteSettings from "@saleor/icons/SiteSettings";
import StaffMembers from "@saleor/icons/StaffMembers";
import Warehouses from "@saleor/icons/Warehouses";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { notificationUrl } from "@saleor/notifications/urls";
import { optionListUrl } from "@saleor/options/urls";
import { paymentUrl } from "@saleor/payments/urls";
import { permissionGroupListUrl } from "@saleor/permissionGroups/urls";
import { pluginListUrl } from "@saleor/plugins/urls";
import { productTypeListUrl } from "@saleor/productTypes/urls";
import { qrListUrl } from "@saleor/qrcode/urls";
import { stripePluginUrl } from "@saleor/plugins/urls";
import { secvicesSection } from "@saleor/servicesTime/urls";
// import { shippingZonesListUrl } from "@saleor/shipping/urls";
import { staffListUrl } from "@saleor/staff/urls";
import { PermissionEnum } from "@saleor/types/globalTypes";
// import { warehouseSection } from "@saleor/warehouses/urls";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import ConfigurationPage, { MenuSection } from "./ConfigurationPage";

export function createConfigurationMenu(
  intl: IntlShape,
  isSuperuser?: boolean
): MenuSection[] {
  const menus = [
    {
      label: intl.formatMessage({
        defaultMessage: "Attributes and Product Types"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Determine attributes used to create product types",
            id: "configurationMenuAttributes"
          }),
          icon: <Attributes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,
          title: intl.formatMessage(sectionNames.attributes),
          url: optionListUrl(),
          testId: "configurationMenuAttributes"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Define types of products you sell",
            id: "configurationMenuProductTypes"
          }),
          icon: <ProductTypes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,
          title: intl.formatMessage(sectionNames.productTypes),
          url: productTypeListUrl(),
          testId: "configurationMenuProductTypes"
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Staff Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage your employees and their permissions",
            id: "configurationMenuStaff"
          }),
          icon: <StaffMembers fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.staff),
          url: staffListUrl(),
          testId: "configurationMenuStaff"
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              "Manage your permission groups and their permissions",
            id: "configurationMenuPermissionGroups"
          }),
          icon: <PermissionGroups fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.permissionGroups),
          url: permissionGroupListUrl(),
          testId: "configurationMenuPermissionGroups"
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Store Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your site settings",
            id: "configurationMenuQRcode"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: "Site Settings",
          url: "/stores",
          testId: "configurationMenuQRcode"
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              "Manage your service hours, delivery time, preordering settings",
            id: "configurationMenuQRcode"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SERVICE_TIME,
          title: "Ordering",
          url: secvicesSection,
          testId: "configurationMenuQRcode"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage your delivery area and fees",
            id: "configurationMenuQRcode"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: "Delivery Settings",
          url: deliverySection,
          testId: "configurationMenuQRcode"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Define and manage your table QRcode",
            id: "configurationMenuQRcode"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_TABLE_SERVICE,
          title: intl.formatMessage(sectionNames.QRcode),
          url: qrListUrl(),
          testId: "configurationMenuQRcode"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage and update your payment",
            id: "configurationPayment"
          }),
          icon: <Warehouses fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: intl.formatMessage(sectionNames.Payment),
          url: paymentUrl(),
          testId: "configurationMenuWarehouses"
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Notification Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage and update your notification",
            id: "configurationNotification"
          }),
          icon: <ShippingMethods fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SHIPPING,
          title: intl.formatMessage(sectionNames.Notification),
          url: notificationUrl(),
          testId: "configurationMenuShipping"
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Stripe Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage and update your Stripe API",
            id: "configurationNotification"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SHIPPING,
          title: intl.formatMessage(sectionNames.stripe),
          url: stripePluginUrl()
        }
      ]
    }
    // {
    //   label: intl.formatMessage({
    //     defaultMessage: "Multichannel"
    //   }),
    //   menuItems: [
    //     {
    //       description: intl.formatMessage({
    //         defaultMessage: "Define and manage your sales channels",
    //         id: "configurationMenuChannels"
    //       }),
    //       icon: <Channels fontSize="inherit" viewBox="0 0 44 44" />,
    //       permission: PermissionEnum.MANAGE_CHANNELS,
    //       title: intl.formatMessage(sectionNames.channels),
    //       url: channelsListUrl(),
    //       testId: "configurationMenuChannels"
    //     }
    //   ]
    // },
    // {
    //   label: intl.formatMessage({
    //     defaultMessage: "Miscellaneous"
    //   }),
    //   menuItems: [
    //     {
    //       description: intl.formatMessage({
    //         defaultMessage: "View and update your plugins and their settings.",
    //         id: "configurationPluginsPages"
    //       }),
    //       icon: (
    //         <Plugins
    //           fontSize="inherit"
    //           viewBox="-8 -5 44 44"
    //           preserveAspectRatio="xMinYMin meet"
    //         />
    //       ),
    //       permission: PermissionEnum.MANAGE_PLUGINS,
    //       title: intl.formatMessage(sectionNames.plugins),
    //       url: pluginListUrl(),
    //       testId: "configurationPluginsPages"
    //     }
    //   ]
    // }
  ];
  if (isSuperuser) {
    menus.push({
      label: intl.formatMessage({
        defaultMessage: "Miscellaneous"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your plugins and their settings.",
            id: "configurationPluginsPages"
          }),
          icon: (
            <Plugins
              fontSize="inherit"
              viewBox="-8 -5 44 44"
              preserveAspectRatio="xMinYMin meet"
            />
          ),
          permission: PermissionEnum.MANAGE_PLUGINS,
          title: intl.formatMessage(sectionNames.plugins),
          url: pluginListUrl(),
          testId: "configurationPluginsPages"
        }
      ]
    });
  }
  return menus;
}

export const configurationMenuUrl = "/configuration/";

export const ConfigurationSection: React.FC = () => {
  const navigate = useNavigator();
  const user = useUser();
  const intl = useIntl();

  const menus = createConfigurationMenu(intl, user?.user?.isSuperuser);

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.configuration)} />
      <ConfigurationPage
        menu={menus}
        user={maybe(() => user.user)}
        onSectionClick={navigate}
      />
    </>
  );
};
export default ConfigurationSection;
