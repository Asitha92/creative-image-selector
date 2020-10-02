import React, { PureComponent, ReactNode } from "react";
import styles from "./listPanel.module.scss";

type result = {
  id: string;
  type: string;
  Name: string;
  url: string;
  tags: string;
};

interface Props {
  results: result[];
  showImages: (value: string) => { id: string };
}
interface State {
  selectedItem: string;
  data: result[];
}

class ListPanel extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedItem: "",
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.results !== this.props.results) {
      this.setState({ data: this.props.results });
    }
  }

  handleChange = (event) => {
    this.setState({ selectedItem: event.target.value }, () => {
      this.props.showImages(this.state.selectedItem);
      console.log(this.state.selectedItem)
    });
  };

  render() {
    return (
      <div className={styles.panel}>
        <ul>
          {this.state.data.map((result) => (
            <li className={styles.options} key={result.id}>
              <button
                value={result.id}
                onClick={this.handleChange}
                className={styles.panel_btn}
              >
                {result.Name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListPanel;
