import { forwardRef } from "react";
import classnames from "classnames";
const TextFieldGroup = forwardRef((props, ref) => {
  return (
    <div className="form-group">
      <input
        type={props.type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error,
        })}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
        ref={ref}
        defaultValue={props.defaultValue}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
});

export default TextFieldGroup;
