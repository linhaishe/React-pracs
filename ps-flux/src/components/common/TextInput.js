import React from "react";
import PropTypes from "prop-types";
export default function TextInput(props) {
  //default value
  let wrapperClass = "form-group";
  //if props error is ouccur and isnt the empty string
  // if (props.error && props.error.length > 0) {
  //   wrapperClass += " has-erroe";
  //an bootstrap class,has-error will add a red line around the input when it's in an error state
  //try the classnames npm package for a nicer way to handle this

  //在最底下声明了默认error，我么不再需要检查是否props.error是否存在，因为我们知道他将会存在
  if (props.error.length > 0) {
    wrapperClass += " has-erroe";
  }

  return (
    //<div className="form-group">
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          name={props.name}
          className="form-control"
          onChange={props.onChange}
          value={props.value}
        />
      </div>
      {/* display validation error */}
      {/* the code on the right will run if the condition on th eleft is true,如果有错的的时候，则有右边的提醒将会出现 */}
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

//every time we create component like this that we except to beused ny a lot of different people , then it's expecially important to declare proptypes for reusable components

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};
//declare a defalut prop for error,if somebody doesnot pass in an error,that it should default to an empty string
TextInput.defaultProps = {
  error: "",
};
