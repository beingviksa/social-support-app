import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { savePersonal } from "@features/form/formSlice";
import Button from "@common/Button";
import VerifiedBadge from "@common/VerifiedBadge";
import ControlledInput from "@form/ControlledInput";

import { personalFormSchema } from "@validations/personalFormSchema";
import { formatNationalId } from "@utils/formatters";
import { mockUsers } from "@mocks/users.mock";
import OtpModal from "./OtpModal";

const NationalIdVerifier = ({
  control,
  setValue,
  watch,
  trigger,
  defaultVerified = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [otpStatus, setOtpStatus] = useState("idle");
  const [isVerified, setIsVerified] = useState(defaultVerified);
  const [otpTargetPhone, setOtpTargetPhone] = useState("");
  const [expectedOtp, setExpectedOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [sendOtpError, setSendOtpError] = useState("");

  const rules = personalFormSchema(t, isVerified, sendOtpError);

  const nationalId = watch("nationalId");
  const digitsOnly = nationalId?.replace(/\D/g, "") || "";
  const isIdReady = digitsOnly.length === 12;

  // Handle resend timer countdown
  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, resendTimer]);

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (sendOtpError) {
      const timer = setTimeout(() => setSendOtpError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [sendOtpError]);

  const handleSendOtp = () => {
    setOtpStatus("loading");
    setSendOtpError("");

    requestAnimationFrame(() => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.nationalId === nationalId);

        if (!user) {
          setOtpStatus("idle");
          setSendOtpError(
            t("step1.otp.noRecord", "No record found for this National ID")
          );
          return;
        }

        setOtpTargetPhone(user.phone);
        setExpectedOtp(user.otp);
        setOtpStatus("success");
        setShowOtpModal(true);
        setResendDisabled(true);
        setResendTimer(30);
      }, 1000);
    });
  };

  return (
    <div>
      <ControlledInput
        name="nationalId"
        control={control}
        labelKey="step1.nationalId"
        placeholder="1111-2222-3333"
        inputMode="numeric"
        rules={rules.nationalId}
        onChange={(val) => {
          const formatted = formatNationalId(val);
          setValue("nationalId", formatted, { shouldValidate: true });
          setIsVerified(false);
        }}
      />

      {isVerified && <VerifiedBadge className="ml-2" />}

      {!isVerified && (
        <Button
          type="button"
          className="mt-2 text-sm"
          disabled={!isIdReady || (resendDisabled && otpStatus !== "loading")}
          onClick={handleSendOtp}
        >
          {otpStatus === "loading"
            ? t("step1.otp.verifying", "Verifying ID...")
            : resendDisabled
              ? t("step1.otp.resendOtpIn", { seconds: resendTimer })
              : t("step1.otp.sendOtp", "Send OTP")}
        </Button>
      )}

      {sendOtpError && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {sendOtpError}
        </p>
      )}

      {showOtpModal && (
        <OtpModal
          phone={otpTargetPhone}
          expectedOtp={expectedOtp}
          onVerifySuccess={() => {
            setIsVerified(true);
            setShowOtpModal(false);
            setOtpStatus("success");
            dispatch(savePersonal({ ...watch(), isVerified: true }));
            setTimeout(() => trigger("nationalId"), 0);
          }}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </div>
  );
};

export default NationalIdVerifier;
