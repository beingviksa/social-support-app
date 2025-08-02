import HelpMeWriteButton from "@common/HelpMeWriteButton";
import ControlledTextarea from "@form/ControlledTextarea";

const SituationField = ({
  name,
  titleKey,
  placeholderKey,
  control,
  loadingField,
  onHelpClick,
  t,
}) => (
  <div key={name}>
    <div className="flex justify-between items-center mb-1">
      <label htmlFor={name} className="font-medium">
        {t(titleKey)}
      </label>
      <HelpMeWriteButton
        field={name}
        onClick={onHelpClick}
        isLoading={loadingField === name}
      />
    </div>
    <ControlledTextarea
      name={name}
      control={control}
      placeholderKey={t(placeholderKey)}
      rules={{
        required: t("step3.required"),
        minLength: {
          value: 20,
          message: t("step3.minLength", { count: 20 }),
        },
      }}
    />
  </div>
);

export default SituationField;
