import { defineMessages } from "react-intl";

export const messages = defineMessages({
  more: {
    id: "app.home.actionableButton",
    description: "Button that serves as an actionable button",
    defaultMessage: "More",
  },
  goToCheckout: {
    id: "app.ride.goToCheckout",
    description: "Action that redirects to the checkout page",
    defaultMessage: "Request rental",
  },
  eBike: {
    id: "app.category.ebike",
    description: "Electric Bike",
    defaultMessage: "Electric Bike",
  },
  regularBike: {
    id: "app.category.regularBike",
    description: "Regular Bike",
    defaultMessage: "Regular Bike",
  },
  ancientBike: {
    id: "app.category.ancientBike",
    description: "Ancient Bike",
    defaultMessage: "Ancient Bike",
  },
  checkoutFormNameFieldLabel: {
    id: "checkout.form.nameFieldLabel",
    description: "Checkout Form Name Field Label",
    defaultMessage: "Name",
  },
  checkoutFormEmailFieldLabel: {
    id: "checkout.form.emailFieldLabel",
    description: "Checkout Form Email Field Label",
    defaultMessage: "Email",
  },
  checkoutFormPhoneNumberFieldLabel: {
    id: "checkout.form.phoneNumberFieldLabel",
    description: "Checkout Form PhoneNumber Field Label",
    defaultMessage: "Phone Number",
  },
  checkoutDateRangeFieldLabel: {
    id: "checkout.form.dateRangeFieldLabel",
    description: "Checkout Form Date Range Field Label",
    defaultMessage: "Date Range",
  },
  validationFieldRequired: {
    id: "form.validation.fieldRequired",
    description: "Field required validation message",
    defaultMessage: "This field is required",
  },
  rentalApplication: {
    id: "checkout.form.rentailApplication",
    description: "Rental Application Title",
    defaultMessage: "Rental Application",
  },
  applyForRent: {
    id: "checkout.summary.applyForRent",
    description: "Rental Application Action",
    defaultMessage: "Apply for Rent",
  },
  checkoutSummary: {
    id: "checkout.summary.summaryTitle",
    description: "Summary title",
    defaultMessage: "Summary",
  },
  hoursSuffix: {
    id: "checkout.summary.hoursSuffix",
    description: "Hours Suffix",
    defaultMessage: "{hourCount, plural, one {hour} other {hours}}",
  },
  daysSuffix: {
    id: "checkout.summary.daysSuffix",
    description: "Days Suffix",
    defaultMessage: "{dayCount, plural, one {day} other {days}}",
  },
  pageTitle: {
    id: "app.home.pageTitle",
    description: "Page title",
    defaultMessage: "Bike Rentals",
  },
  agreeOption: {
    id: "dialog.agreeOption",
    description: "Agree option for dialog button",
    defaultMessage: "Agree",
  },
  disagreeOption: {
    id: "dialog.disagreeOption",
    description: "Disagree option for dialog button",
    defaultMessage: "Disagree",
  },
  continueQuestion: {
    id: "dialog.continueQustion",
    description: "Continue question in dialog",
    defaultMessage: "Continue?",
  },
});

export default messages;
