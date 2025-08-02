export const mockCountries = [
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "United States", code: "US", dialCode: "+1" },
];

export const statesByCountry = {
  IN: ["Maharashtra", "Karnataka", "Delhi"],
  AE: ["Dubai", "Abu Dhabi"],
  US: ["California", "Texas", "New York"],
};

export const citiesByState = {
  Maharashtra: ["Mumbai", "Pune"],
  Karnataka: ["Bangalore", "Mysore"],
  Delhi: ["New Delhi"],
  Dubai: ["Deira", "Jumeirah"],
  ["Abu Dhabi"]: ["Al Ain", "Madinat Zayed"],
  California: ["Los Angeles", "San Francisco"],
  Texas: ["Houston", "Dallas"],
  NewYork: ["New York City", "Buffalo"],
};
