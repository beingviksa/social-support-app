import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { resetForm } from "@features/form/formSlice";
import { resetFormProgress } from "@features/formProgress/formProgressSlice";

// eslint-disable-next-line no-unused-vars
const withAuth = (Component) => {
  const AuthWrapper = (props) => {
    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch();
    const {
      formStarted,
      step1Completed,
      step2Completed,
      step3Completed,
      formCompleted,
    } = useSelector((state) => state.formProgress);

    const [checked, setChecked] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
      const isFormStep = pathname.startsWith("/form/step-");
      const isThankYou = pathname === "/thank-you";

      if (!formStarted && (isFormStep || isThankYou)) {
        setRedirectTo("/");
        setChecked(true);
        return;
      }

      if (isThankYou) {
        if (!step1Completed) {
          setRedirectTo("/form/step-1");
        } else if (!step2Completed) {
          setRedirectTo("/form/step-2");
        } else if (!step3Completed) {
          setRedirectTo("/form/step-3");
        } else {
          setRedirectTo(null);
        }
        setChecked(true);
        return;
      }

      if (formCompleted && isFormStep) {
        setRedirectTo("/");
        dispatch(resetFormProgress());
        dispatch(resetForm());
        localStorage.removeItem("persist:root");
        setChecked(true);
        return;
      }

      if (pathname === "/form/step-2" && !step1Completed) {
        setRedirectTo("/form/step-1");
      } else if (pathname === "/form/step-3" && !step2Completed) {
        setRedirectTo("/form/step-2");
      } else {
        setRedirectTo(null);
      }

      setChecked(true);
    }, [
      dispatch,
      pathname,
      formStarted,
      step1Completed,
      step2Completed,
      step3Completed,
      formCompleted,
    ]);

    if (!checked) return null;
    if (redirectTo && redirectTo !== pathname) {
      return <Navigate to={redirectTo} replace />;
    }

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
