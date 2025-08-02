import { Controller } from "react-hook-form";

import TextInput from "@common/TextInput";

const ControlledInput = ({ name, control, rules, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextInput {...field} {...rest} error={fieldState.error?.message} />
      )}
    />
  );
};

export default ControlledInput;
