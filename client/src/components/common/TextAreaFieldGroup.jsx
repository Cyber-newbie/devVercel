import { forwardRef } from "react";
import classnames from "classnames";
const TextAreaFieldGroup = forwardRef((props, ref) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error,
        })}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        value={props.value}
        ref={ref}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
});

export default TextAreaFieldGroup;
