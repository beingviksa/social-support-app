import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { resetForm } from "@features/form/formSlice";
import {
  completeForm,
  resetFormProgress,
} from "@features/formProgress/formProgressSlice";

import Button from "@common/Button";

const ThankYou = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { personal, financial, situation } = useSelector((state) => state.form);
  const { step1Completed, step2Completed, step3Completed } = useSelector(
    (state) => state.formProgress
  );

  useEffect(() => {
    document.title = t(
      "thankYou.pageTitle",
      "Thank You - Application Submitted"
    );
  }, [t]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t("thankYou.pdfTitle"), 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [[t("thankYou.section.personal"), ""]],
      body: [
        [t("step1.name"), personal.name],
        [t("step1.nationalId"), personal.nationalId],
        [t("step1.dob"), personal.dob],
        [t("step1.gender"), t(`gender.${personal.gender}`)],
        [
          t("step1.address"),
          `${personal.city}, ${personal.state}, ${personal.country}`,
        ],
        [t("step1.phone"), `+${personal.phone}`],
        [t("step1.email"), personal.email],
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [[t("thankYou.section.financial"), ""]],
      body: [
        [
          t("step2.maritalStatus"),
          t(`step2.options.${financial.maritalStatus}`),
        ],
        [t("step2.dependents"), financial.dependents],
        [
          t("step2.employment"),
          t(`step2.options.${financial.employmentStatus}`),
        ],
        [t("step2.income"), `${financial.income}`],
        [t("step2.housing"), t(`step2.options.${financial.housing}`)],
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [52, 152, 219] },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [[t("thankYou.section.situation")]],
      body: [
        [
          {
            content: `${t("step3.financial")}\n${situation.financialSituation}`,
            styles: { cellWidth: 180 },
          },
        ],
        [
          {
            content: `${t("step3.employment")}\n${situation.employmentCircumstances}`,
            styles: { cellWidth: 180 },
          },
        ],
        [
          {
            content: `${t("step3.reason")}\n${situation.reasonForApplying}`,
            styles: { cellWidth: 180 },
          },
        ],
      ],
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [231, 76, 60],
      },
    });

    doc.save("social-support-application.pdf");
  };

  useEffect(() => {
    if (step1Completed && step2Completed && step3Completed) {
      dispatch(completeForm());
    }
  }, [dispatch, step1Completed, step2Completed, step3Completed]);

  const handleGoHome = () => {
    dispatch(resetFormProgress());
    dispatch(resetForm());
    localStorage.removeItem("persist:root");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
        {t("thankYou.title")}
      </h2>
      <p className="text-gray-700 text-lg">{t("thankYou.subtitle")}</p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button onClick={handleDownloadPDF}>
          <span className="inline-flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5" />
            {t("thankYou.downloadPdf")}
          </span>
        </Button>
        <Button variant="text" onClick={handleGoHome}>
          ← {t("buttons.backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
