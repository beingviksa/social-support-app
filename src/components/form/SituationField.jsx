import HelpMeWriteButton from "@common/HelpMeWriteButton";
import ControlledTextarea from "@form/ControlledTextarea";
import { situationFormSchema } from "@validations/situationFormSchema";

const SituationField = ({
  name,
  titleKey,
  placeholderKey,
  control,
  loadingField,
  onHelpClick,
  t,
}) => {
  const schema = situationFormSchema(t);
  return (
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
        placeholderKey={placeholderKey}
        rules={schema.input}
      />
    </div>
  );
};
export default SituationField;
