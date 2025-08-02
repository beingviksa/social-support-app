export const formatDobObjectToString = ({ day, month, year }) => {
  return `${year}-${month}-${day}`;
};

export const parseDobStringToObject = (dobString) => {
  if (typeof dobString === "string" && dobString.includes("-")) {
    const [year, month, day] = dobString.split("-");
    return {
      day: day.padStart(2, "0"),
      month: month.padStart(2, "0"),
      year,
    };
  }
  return { day: "", month: "", year: "" };
};

export const getInitialDob = (dob) => {
  if (typeof dob === "string") return parseDobStringToObject(dob);
  return dob || { day: "", month: "", year: "" };
};
