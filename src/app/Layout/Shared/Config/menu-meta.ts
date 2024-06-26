import { MenuItem } from "../Models/menu.model";

// menu items for vertcal and detached layout
const MENU_ITEMS: MenuItem[] = [
  { key: "navigation", label: "MAIN", isTitle: true },
  {
    key: "dashboard",
    label: "Dashboard",
    isTitle: false,
    icon: "zmdi zmdi-home",
    url: "",
  },
  { key: "treat", label: "Treatment", isTitle: true },
  {
    key: "treat-patient",
    label: "Palients",
    isTitle: false,
    icon: "zmdi zmdi-accounts-list-alt",
    collapsed: true,
    url: "",
    children: [
      {
        key: "patient-list",
        label: "Patient List",
        url: "/patients",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-patient",
      },
      {
        key: "patient-new",
        label: "New patient",
        url: "/patients/new-patient",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-patient",
      },
    ],
  },
  {
    key: "treat-cases",
    label: "Treatment",
    isTitle: false,
    icon: "zmdi zmdi-folder-person",
    collapsed: true,
    children: [
      // add status to treatment list to filter treatments
      {
        key: "treat-plan",
        label: "List Treatments ",
        url: "/treatment/list",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-cases",
      },
      {
        key: "treat-archive",
        label: "Archive",
        url: "/treatment/list",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-cases",
      },
      {
        key: "treat-new-plan",
        label: "New Treatment",
        url: "treatment/new-treatment/null",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-cases",
      },
    ],
  },
  {
    key: "apps-invoice",
    label: "Invoices",
    isTitle: false,
    icon: "zmdi zmdi-money-box",
    collapsed: true,
    children: [
      {
        key: "email-inbox",
        label: "Invoice List",
        url: "/",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "apps-invoice",
      },
      {
        key: "email-inbox",
        label: "New Invoice",
        url: "/",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "apps-invoice",
      },
      {
        key: "email-inbox",
        label: "Devices",
        url: "/",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "apps-invoice",
      },
    ],
  },
  { key: "apps", label: "Apps", isTitle: true },
  {
    key: "apps-calendar",
    label: "Calendar",
    isTitle: false,
    icon: "zmdi zmdi-calendar",
    url: "/",
  },

  {
    key: "apps-chat",
    label: "Chat",
    isTitle: false,
    icon: "zmdi zmdi-comments",
    url: "/",
  },
  {
    key: "apps-email",
    label: "Email",
    isTitle: false,
    icon: "zmdi zmdi-email",
    collapsed: true,
    children: [
      {
        key: "email-inbox",
        label: "Inbox",
        url: "/",
        icon: "zmdi zmdi-arrow-right",

        parentKey: "apps-email",
      },
      {
        key: "email-inbox",
        label: "Compose",
        url: "/",
        icon: "zmdi zmdi-arrow-right",

        parentKey: "apps-email",
      },
    ],
  },
];

export { MENU_ITEMS };
