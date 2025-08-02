import { useEffect, useState, useCallback } from "react";

import {
  mockCountries,
  statesByCountry,
  citiesByState,
} from "@mocks/location.mock";

const useLocationDropdowns = (selectedCountry, selectedState) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [dialCode, setDialCode] = useState("");

  useEffect(() => {
    if (selectedCountry) {
      const country = mockCountries.find((c) => c.code === selectedCountry);
      setDialCode(country?.dialCode || "");
      setStates(statesByCountry[selectedCountry] || []);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(citiesByState[selectedState] || []);
    }
  }, [selectedState]);

  const initializeFromSavedData = useCallback((savedData) => {
    if (savedData?.country) {
      const country = mockCountries.find((c) => c.code === savedData.country);
      setDialCode(country?.dialCode || "");
      setStates(statesByCountry[savedData.country] || []);
    }
    if (savedData?.state) {
      setCities(citiesByState[savedData.state] || []);
    }
  }, []);

  return {
    dialCode,
    states,
    cities,
    initializeFromSavedData,
  };
};

export default useLocationDropdowns;
