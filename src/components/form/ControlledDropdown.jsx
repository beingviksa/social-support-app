import { Controller } from "react-hook-form";
import Dropdown from "../common/Dropdown";

const ControlledDropdown = ({ name, control, rules, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Dropdown {...field} {...rest} error={fieldState.error?.message} />
      )}
    />
  );
};

export default ControlledDropdown;
