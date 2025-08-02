export const formatNationalId = (value) => {
  const numeric = value.replace(/\D/g, "").slice(0, 12);
  const parts = numeric.match(/.{1,4}/g);
  return parts ? parts.join("-") : "";
};

export const maskPhoneNumber = (phone) => {
  if (!phone) return "";
  const countryCode = phone.startsWith("+") ? phone.slice(0, 3) : "";
  const visibleDigits = phone.slice(-4);
  return `${countryCode}-******${visibleDigits}`;
};
