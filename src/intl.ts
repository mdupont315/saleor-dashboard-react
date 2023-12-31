import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  availability: {
    defaultMessage: "Availability"
  },
  vouchers: {
    defaultMessage: "Discounts"
  },

  delivery: {
    defaultMessage: "Delivery"
  },
  deliveryArea: {
    defaultMessage: "Delivery Area By Postcodes"
  },
  deliveryFees: {
    defaultMessage: "Delivery Fee Settings"
  },
  catalog: {
    defaultMessage: "Catalog"
  },
  chooseFile: {
    defaultMessage: "Choose file",
    description: "button"
  },
  customApps: {
    defaultMessage: "Local Apps"
  },
  dashboard: {
    defaultMessage: "Dashboard"
  },
  stores: {
    defaultMessage: "Stores Manage"
  },
  emergency: {
    defaultMessage: "Emergency"
  },
  deliveryService: {
    defaultMessage: "Delivery Hours"
  },
  deliveryProcess: {
    defaultMessage: "Delivery Order Processing Time"
  },
  pickupProcess: {
    defaultMessage: "Pickup Order Processing Time"
  },
  pickupService: {
    defaultMessage: "Pickup Hours"
  },
  qrService: {
    defaultMessage: "QR Order Hours"
  },
  demo: {
    defaultMessage:
      "Just to let you know... You're in demo mode. You can play around with the dashboard but can't save changes.",
    description: "notification message after log in"
  },
  description: {
    defaultMessage: "Description"
  },
  descriptionOptional: {
    defaultMessage: "Description (optional)"
  },
  discounts: {
    defaultMessage: "Discounts"
  },
  drafts: {
    defaultMessage: "Drafts"
  },
  email: {
    defaultMessage: "E-mail Address"
  },
  endDate: {
    defaultMessage: "End Date"
  },
  endHour: {
    defaultMessage: "End Hour"
  },
  firstName: {
    defaultMessage: "First Name"
  },
  generalInformations: {
    // defaultMessage: "General Information"
    defaultMessage: "Modifier Information"
  },
  insufficientPermissions: {
    defaultMessage: "Insufficient permissions"
  },
  lastName: {
    defaultMessage: "Last Name"
  },
  limitReached: {
    defaultMessage: "Reached limit for this plan"
  },
  no: {
    defaultMessage: "No"
  },
  optionalField: {
    defaultMessage: "Optional",
    description: "field is optional"
  },
  properties: {
    defaultMessage: "Properties"
  },
  readOnly: {
    defaultMessage: "Saleor runs in read-only mode. Changes not saved."
  },
  requiredField: {
    defaultMessage: "This field is required"
  },
  savedChanges: {
    defaultMessage: "Saved changes"
  },
  sessionExpired: {
    defaultMessage: "Your session has expired. Please log in again to continue."
  },
  somethingWentWrong: {
    defaultMessage: "Something went wrong"
  },
  startDate: {
    defaultMessage: "Start Date"
  },
  startHour: {
    defaultMessage: "Start Hour"
  },
  status: {
    defaultMessage: "Status"
  },
  summary: {
    defaultMessage: "Summary"
  },
  unauthorizedDashboardAccess: {
    defaultMessage: "Only staff users can access the dashboard"
  },
  uploadImage: {
    defaultMessage: "Upload image",
    description: "button"
  },
  yes: {
    defaultMessage: "Yes"
  }
});

export const buttonMessages = defineMessages({
  accept: {
    defaultMessage: "Accept",
    description: "button"
  },
  back: {
    defaultMessage: "Back",
    description: "button"
  },
  cancel: {
    defaultMessage: "Cancel",
    description: "button"
  },
  clear: {
    defaultMessage: "Clear",
    description: "button"
  },
  confirm: {
    defaultMessage: "Confirm",
    description: "button"
  },
  continue: {
    defaultMessage: "Continue",
    description: "button"
  },
  create: {
    defaultMessage: "Create",
    description: "button"
  },
  delete: {
    defaultMessage: "Delete",
    description: "button"
  },
  done: {
    defaultMessage: "Done",
    description: "button"
  },
  edit: {
    defaultMessage: "Edit",
    description: "button"
  },
  manage: {
    defaultMessage: "Manage",
    description: "button"
  },
  nextStep: {
    defaultMessage: "Next",
    description: "go to next step, button"
  },
  ok: {
    defaultMessage: "OK",
    description: "button"
  },
  remove: {
    defaultMessage: "Remove",
    description: "button"
  },
  save: {
    defaultMessage: "Save",
    description: "button"
  },
  select: {
    defaultMessage: "Select",
    description: "select option, button"
  },
  selectAll: {
    defaultMessage: "Select All",
    description: "select all options, button"
  },
  send: {
    defaultMessage: "Send",
    description: "button"
  },
  show: {
    defaultMessage: "Show",
    description: "button"
  },
  undo: {
    defaultMessage: "Undo",
    description: "button"
  },
  showGGM: {
    defaultMessage: "Show On Google Maps",
    description: "button"
  }
});

export const sectionNames = defineMessages({
  apps: {
    defaultMessage: "Apps",
    description: "apps section name"
  },
  Notification: {
    defaultMessage: "Notifications",
    description: "Notifications section name"
  },
  QRcode: {
    defaultMessage: "QR Ordering",
    description: "QRcode section name"
  },
  Payment: {
    defaultMessage: "Payment Methods",
    description: "Payment section name"
  },
  attributes: {
    defaultMessage: "Modifiers",
    description: "attributes section name"
  },
  categories: {
    defaultMessage: "Categories",
    description: "categories section name"
  },
  stores: {
    defaultMessage: "Site Settings",
    description: "Site settings section name"
  },
  delivery: {
    defaultMessage: "Delivery Settings",
    description: "delivery section name"
  },
  serviceTime: {
    defaultMessage: "Ordering",
    description: "ordering section name"
  },
  emergency: {
    defaultMessage: "Emergency",
    description: "emergency section name"
  },
  channels: {
    defaultMessage: "Channels",
    description: "channels section name"
  },
  collections: {
    defaultMessage: "Collections",
    description: "collections section name"
  },
  configuration: {
    defaultMessage: "Configuration",
    description: "configuration section name"
  },
  customers: {
    defaultMessage: "Customers",
    description: "customers section name"
  },
  draftOrders: {
    defaultMessage: "Draft Orders",
    description: "draft orders section name"
  },
  exchangeRates: {
    defaultMessage: "Exchange Rates",
    description: "Manage and Update your warehouse information"
  },
  home: {
    defaultMessage: "Home",
    description: "home section name"
  },
  navigation: {
    defaultMessage: "Navigation",
    description: "navigation section name"
  },
  orders: {
    defaultMessage: "Orders",
    description: "orders section name"
  },
  pageTypes: {
    defaultMessage: "Page Types",
    description: "page types section name"
  },
  pages: {
    defaultMessage: "Pages",
    description: "pages section name"
  },
  permissionGroups: {
    defaultMessage: "Permission Groups",
    description: "permission groups section name"
  },
  plugins: {
    defaultMessage: "Plugins",
    description: "plugins section name"
  },
  productTypes: {
    defaultMessage: "Product Types",
    description: "product types section name"
  },
  products: {
    defaultMessage: "Products",
    description: "products section name"
  },
  sales: {
    defaultMessage: "Sales",
    description: "sales section name"
  },
  serviceAccounts: {
    defaultMessage: "Service Accounts",
    description: "service accounts section name"
  },
  shipping: {
    defaultMessage: "Shipping Methods",
    description: "shipping section name"
  },
  siteSettings: {
    defaultMessage: "Site Settings",
    description: "site settings section name"
  },
  staff: {
    defaultMessage: "Staff Members",
    description: "staff section name"
  },
  taxes: {
    defaultMessage: "Taxes",
    description: "taxes section name"
  },
  translations: {
    defaultMessage: "Translations",
    description: "translations section name"
  },
  vouchers: {
    defaultMessage: "Vouchers",
    description: "vouchers section name"
  },
  warehouses: {
    defaultMessage: "Warehouses",
    description: "warehouses section name"
  },
  webhooks: {
    defaultMessage: "Webhooks",
    description: "webhooks section name"
  },
  stripe: {
    defaultMessage: "Stripe Settings",
    description: "Stripe Settings"
  }
});

export function translateBoolean(value: boolean, intl: IntlShape): string {
  return value
    ? intl.formatMessage(commonMessages.yes)
    : intl.formatMessage(commonMessages.no);
}
