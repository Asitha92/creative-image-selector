import React, { Component } from "react";
import styles from "./dropdownList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

type Option = {
  value: string;
  display: string;
};

interface Props {
  optionList: Option[];
  id: string;
  onGetSelectedOption: (value: string) => void;
}

interface State {
  isOpen: boolean;
  selectedValue: string;
}

class DropdownList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedValue: "",
    };
  }

  handleChange = (event: any) => {
    this.setState({ selectedValue: event.target.value }, () => {
      this.props.onGetSelectedOption(this.state.selectedValue);
    });
  };

  render() {
    return (
      <label>
        <span />
        <select
          id={this.props.id}
          value={this.state.selectedValue}
          onChange={this.handleChange}
          className={styles.select}
        >
          {this.props.optionList.map((option) => (
            <option
              className={styles.select_option}
              key={option.value}
              value={option.value}
            >
              {option.display}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default DropdownList;
