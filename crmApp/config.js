import { Appearance } from "react-native";

const config = {
  PRIMARY_COLOR: (function() {
    if (Appearance.getColorScheme() === "dark") {
      return "black";
    } else {
      return "#229ED9";
    }
  })(),
  HEADER_COLOR: "#229ED9",

  TITLE: "CRM App",
  MAIN_SCREEN_TITLE: "CRM App",
  ADD_CUSTOMER_SCREEN_TITLE: "Add Customer",
  LISTING_SCREEN: "ListingScreen",
  INPUT_SCREEN: "InputScreen",
  DATA_KEY: "TODOAPP_DATA",

  UNABLE_TO_ADD_CUSTOMER: "Unable to add customer. Please try again.",
  UNABLE_TO_LOAD_CUSTOMER:
    "Unable to load customer. Please restart app and try again.",
};

export default config;
