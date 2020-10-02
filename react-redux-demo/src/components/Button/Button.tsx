import React, { FunctionComponent } from "react";
import styles from "./button.module.scss";

interface Props {
  disabled?: boolean;
  label: string;
  onButtonClick: () => void;
}

const Button: FunctionComponent<Props> = (props) => {
  const {} = props;

  return (
      <button className={styles.btn_styles} disabled={props.disabled} onClick={() => props.onButtonClick()}>
          {props.label}
      </button>
  );
};

Button.defaultProps = {
    disabled: false
}

export default Button;
