import { forwardRef } from "react";
import classnames from "classnames";
const SelectListFieldGroup = forwardRef((props, ref) => {
  const selectedOptions = props.options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        type={props.type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error,
        })}
        name={props.name}
        onChange={props.onChange}
        ref={ref}
        value={props.value}
      >
        {selectedOptions}
      </select>
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
});

export default SelectListFieldGroup;
