import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { savePersonal } from "../../features/form/formSlice";

import ControlledInput from "./ControlledInput";
import Button from "../common/Button";
import VerifiedBadge from "../common/VerifiedBadge";

import {
  formatNationalId,
  maskPhoneNumber,
} from "../../utils/formatNationalId";
import { mockUsers } from "../../utils/mockUsers";

const NationalIdVerifier = ({
  control,
  setValue,
  watch,
  trigger,
  defaultVerified = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [otpValue, setOtpValue] = useState("");
  const [otpStatus, setOtpStatus] = useState("idle");
  const [isVerified, setIsVerified] = useState(defaultVerified);
  const [otpTargetPhone, setOtpTargetPhone] = useState("");
  const [expectedOtp, setExpectedOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // resend timer
  useEffect(() => {
    let timer;
    if (resendDisabled && resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, resendTimer]);

  const handleVerifyOtp = async () => {
    try {
      setVerifying(true);

      // simulate API delay
      await new Promise((res) => setTimeout(res, 1000));

      if (otpValue === expectedOtp) {
        setIsVerified(true);
        setShowOtpModal(false);
        setOtpStatus("success");

        dispatch(savePersonal({ ...watch(), isVerified: true }));

        // Trigger re-validation to clear any field error
        setTimeout(() => {
          trigger("nationalId");
        }, 0);
      } else {
        setOtpStatus("error");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtpStatus("error");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <ControlledInput
        name="nationalId"
        control={control}
        labelKey="step1.nationalId"
        placeholder="1111-2222-3333"
        inputMode="numeric"
        rules={{
          required: t("step1.nidRequired"),
          validate: {
            lengthCheck: (val) =>
              val.replace(/\D/g, "").length === 12 || t("step1.nidLength"),
            numberOnly: (val) => /^[\d-]+$/.test(val) || t("step1.nidDigits"),
            otpVerified: () => isVerified || t("step1.otp.notVerified"),
          },
        }}
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
          disabled={resendDisabled}
          onClick={() => {
            setVerifying(false);
            const id = watch("nationalId");
            const user = mockUsers.find((u) => u.nationalId === id);
            if (!user) return alert("No record found for this National ID");

            setOtpTargetPhone(user.phone);
            setExpectedOtp(user.otp);
            setOtpStatus("loading");
            setOtpValue("");
            setResendDisabled(true);
            setResendTimer(30);

            setTimeout(() => {
              setShowOtpModal(true);
              setOtpStatus("success");
            }, 1000);
          }}
        >
          {resendDisabled
            ? t("step1.otp.resendOtpIn", { seconds: resendTimer })
            : otpStatus === "loading"
              ? t("step1.otp.verifying", "Sending OTP...")
              : t("step1.otp.sendOtp", "Send OTP")}
        </Button>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              {t("step1.otp.title")}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {t("step1.otp.sentTo", {
                masked: maskPhoneNumber(otpTargetPhone),
              })}
            </p>

            <input
              type="text"
              value={otpValue}
              onChange={(e) =>
                setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder={t("step1.otp.placeholder")}
              className="input w-full mb-2"
            />

            {otpStatus === "error" && (
              <p className="text-red-500 text-sm mb-2">
                {t("step1.otp.invalid")}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="text" onClick={() => setShowOtpModal(false)}>
                {t("step1.otp.cancel")}
              </Button>
              <Button
                onClick={handleVerifyOtp}
                isLoading={verifying}
                loadingText={t("step1.otp.verifying")}
              >
                {t("step1.otp.verify")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalIdVerifier;
