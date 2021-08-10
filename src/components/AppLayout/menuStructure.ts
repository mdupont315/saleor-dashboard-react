// import appsIcon from "@assets/images/menu-apps-icon.svg";
import catalogIcon from "@assets/images/menu-catalog-icon.svg";
import customerIcon from "@assets/images/menu-customers-icon.svg";
import discountsIcon from "@assets/images/menu-discounts-icon.svg";
import homeIcon from "@assets/images/menu-home-icon.svg";
import ordersIcon from "@assets/images/menu-orders-icon.svg";
import { voucherListPath } from "@saleor/discounts/urls";
import { commonMessages, sectionNames } from "@saleor/intl";
import { IntlShape } from "react-intl";
import { categoryListUrl } from "../../categories/urls";
import { collectionListUrl } from "../../collections/urls";
import { customerListUrl } from "../../customers/urls";
import { orderDraftListUrl, orderListUrl } from "../../orders/urls";
import { productListUrl } from "../../products/urls";
import { PermissionEnum } from "../../types/globalTypes";

export interface IMenuItem {
  ariaLabel: string;
  children?: IMenuItem[];
  icon?: any;
  label: string;
  permission?: PermissionEnum;
  testingContextId: string;
  url?: string;
}

function createMenuStructure(intl: IntlShape): IMenuItem[] {
  return [
    {
      ariaLabel: "home",
      icon: homeIcon,
      label: intl.formatMessage(sectionNames.home),
      testingContextId: "home",
      url: "/"
    },
    {
      ariaLabel: "catalogue",
      children: [
        {
          ariaLabel: "products",
          label: intl.formatMessage(sectionNames.products),
          testingContextId: "products",
          url: productListUrl()
        },
        {
          ariaLabel: "categories",
          label: intl.formatMessage(sectionNames.categories),
          testingContextId: "categories",
          url: categoryListUrl()
        },
        {
          ariaLabel: "collections",
          label: intl.formatMessage(sectionNames.collections),
          testingContextId: "collections",
          url: collectionListUrl()
        }
      ],
      icon: catalogIcon,
      label: intl.formatMessage(commonMessages.catalog),
      permission: PermissionEnum.MANAGE_PRODUCTS,
      testingContextId: "catalogue"
    },
    {
      ariaLabel: "orders",
      children: [
        {
          ariaLabel: "orders",
          label: intl.formatMessage(sectionNames.orders),
          permission: PermissionEnum.MANAGE_ORDERS,
          testingContextId: "orders",
          url: orderListUrl()
        },
        {
          ariaLabel: "order drafts",
          label: intl.formatMessage(commonMessages.drafts),
          permission: PermissionEnum.MANAGE_ORDERS,
          testingContextId: "order drafts",
          url: orderDraftListUrl()
        }
      ],
      icon: ordersIcon,
      label: intl.formatMessage(sectionNames.orders),
      permission: PermissionEnum.MANAGE_ORDERS,
      testingContextId: "orders"
    },

    {
      ariaLabel: "vouchers",
      icon: discountsIcon,
      label: intl.formatMessage(commonMessages.vouchers),
      permission: PermissionEnum.MANAGE_DISCOUNTS,
      testingContextId: "vouchers",
      url: voucherListPath
    },
    {
      ariaLabel: "customers",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.customers),
      permission: PermissionEnum.MANAGE_USERS,
      testingContextId: "customers",
      url: customerListUrl()
    }
  ];
}

export default createMenuStructure;
