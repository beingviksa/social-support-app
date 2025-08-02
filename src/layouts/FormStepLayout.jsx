// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import FormNavigationButtons from "@/components/form/FormNavigationButtons";

const FormStepLayout = ({
  children,
  isSaving = false,
  formId,
  onBackClick,
  onSubmit,
  ariaLabel,
  nextLabelKey,
}) => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <div className="flex-1 px-4 pt-6 pb-32 transition-opacity duration-300 ease-in-out">
        <motion.form
          id={formId}
          onSubmit={onSubmit}
          aria-label={ariaLabel}
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: isSaving ? 0.5 : 1,
            y: 0,
          }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${isSaving ? "pointer-events-none" : ""}`}
        >
          {children}
        </motion.form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-50">
        <FormNavigationButtons
          isSaving={isSaving}
          onBackClick={onBackClick}
          formId={formId}
          nextLabelKey={nextLabelKey}
        />
      </div>
    </div>
  );
};

export default FormStepLayout;
