import { forwardRef } from "react";
import classnames from "classnames";
const InputGroup = forwardRef((props, ref) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={props.icon}></i>
        </span>
      </div>
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error,
        })}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        ref={ref}
        defaultValue={props.defaultValue}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
});

export default InputGroup;
