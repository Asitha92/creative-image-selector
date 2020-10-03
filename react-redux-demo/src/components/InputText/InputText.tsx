import React, { Component } from "react";
import styles from "./inputText.module.scss";
import { connect } from "react-redux";
import { updateInputText } from "../../redux";

type Props = {
  inputTextValidation: (event: string) => void;
  getInputTextValue: (event: string) => void;
  updateInputText: (input: string) => void;
  id: string;
  infoText?: string;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  width?: string;
  input: string;
};

type State = {
  inputTextValue: string;
};

class InputText extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      inputTextValue: "",
    };
  }

  handleChange = (event) => {
      this.props.updateInputText(event.target.value);
  };

  render() {
    return (
      <div className={styles.InputTextContainer}>
        {this.props.label != null && (
          <label htmlFor={this.props.id} className={styles.lsLabel}>
            {this.props.label}
          </label>
        )}
        <input
          id={this.props.id}
          style={{ width: this.props.width }}
          className={styles.inputText}
          onChange={(event) => {
            this.handleChange(event);
          }}
          value={this.props.input}
          disabled={this.props.isDisabled}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }

  public static defaultProps = {
    width: "97%",
    isDisabled: false,
    placeholder: "",
    infoText: "",
    label: "",
  };
}

const mapStateToProps = (state) => {
  return {
    input: state.input,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInputText: (inputText: string) =>
      dispatch(updateInputText(inputText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputText);
