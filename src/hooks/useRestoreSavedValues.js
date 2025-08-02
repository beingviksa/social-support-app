import { useEffect } from "react";

const useRestoreSavedValues = (savedData, setValue) => {
  useEffect(() => {
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        if (value !== undefined && key !== "dob") {
          setValue(key, value);
        }
      });
    }
  }, [savedData, setValue]);
};

export default useRestoreSavedValues;
