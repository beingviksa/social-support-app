import { useState } from "react";
import { useTranslation } from "react-i18next";

import Modal from "@common/Modal";
import Button from "@common/Button";
import { maskPhoneNumber } from "@utils/formatters";

const OtpModal = ({ phone, expectedOtp, onVerifySuccess, onClose }) => {
  const { t } = useTranslation();
  const [otpValue, setOtpValue] = useState("");
  const [status, setStatus] = useState("idle");

  const handleVerify = async () => {
    setStatus("verifying");
    await new Promise((r) => setTimeout(r, 1000));

    if (otpValue === expectedOtp) {
      setStatus("idle");
      onVerifySuccess();
    } else {
      setStatus("error");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} titleId="otp-modal-title">
      <h3 id="otp-modal-title" className="text-lg font-semibold mb-2">
        {t("step1.otp.title")}
      </h3>

      <p className="text-sm text-gray-600 mb-3">
        {t("step1.otp.sentTo", { masked: maskPhoneNumber(phone) })}
      </p>

      <input
        type="text"
        value={otpValue}
        onChange={(e) =>
          setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))
        }
        placeholder={t("step1.otp.placeholder")}
        className="input w-full mb-2"
        aria-label={t("step1.otp.placeholder")}
      />

      {status === "error" && (
        <p className="text-red-500 text-sm mb-2">{t("step1.otp.invalid")}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="text" onClick={onClose}>
          {t("step1.otp.cancel")}
        </Button>
        <Button
          onClick={handleVerify}
          isLoading={status === "verifying"}
          loadingText={t("step1.otp.verifying", "Verifying...")}
        >
          {t("step1.otp.verify")}
        </Button>
      </div>
    </Modal>
  );
};

export default OtpModal;
