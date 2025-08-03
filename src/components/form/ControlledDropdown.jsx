import { Controller } from "react-hook-form";
import Dropdown from "@common/Dropdown";

const ControlledDropdown = ({ name, control, rules, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const error = fieldState.error?.message;

        return (
          <Dropdown
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            {...rest}
          />
        );
      }}
    />
  );
};

export default ControlledDropdown;
