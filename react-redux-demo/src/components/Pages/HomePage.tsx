import React, { Component } from "react";
import styles from "./homePage.module.scss";
import axios from "axios";
import DropdownList from "../Dropdown";
import InputText from "../InputText";
import Button from "../Button";
import ListPanel from "../ListPanel";
import { optionList, tagNames } from "../common";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import { updateVehicles, updateTags, updateInputText, UpdateSeachList } from "../../redux";
import ImageViewer from "../ImageViewer";

type Vehicle = {
  id: string;
  type: string;
  Name: string;
  url: string;
  tags: string[];
};

type Option = {
  Name: string;
  id: string;
};

interface Props {
  updateVehicles: (value: any) => void;
  updateTags: (selectedList: Option[]) => void;
  updateInputText: (inputValue: string) => void;
  UpdateSeachList: (vehicleSeachList: Vehicle[]) => void;
  vehicleResults: Vehicle[];
  tags: Option[];
  input: string;
  searchList: Vehicle[];
}

interface State {
  vehicleData: Vehicle[];
  tags: Option[];
  leftPanelSelect: {};
  pageChanged: boolean;
}

class HomePage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      vehicleData: [],
      tags: [],
      leftPanelSelect: {},
      pageChanged: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.vehicleResults !== prevProps.vehicleResults) {
      this.setState({ pageChanged: true });
    }
  }

  onSelect = (selectedList: Option[]) => {
    this.setState({ tags: selectedList }, () => {
      this.props.updateTags(this.state.tags);
      console.log("selected tags", this.props.tags);
    });
  };

  onCategorySelect = async (value: string) => {
    await axios
      .get(`http://localhost:5000/${value}`)
      .then((res) => {
        this.setState({ vehicleData: res.data }, () => {
          this.props.updateVehicles(this.state.vehicleData);
          this.props.UpdateSeachList(this.state.vehicleData)
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  clearFields = () => {
    let optionList: Option[] = [];
    let input: string = "";
    this.props.updateTags(optionList);
    this.props.updateInputText(input);
  };

  onfilter = () => {
    let searchedArray: Vehicle[] = [];

    const searchData = this.props.vehicleResults;
    if (searchData.length !== 0) {
      searchData.forEach((item) => {
        // when only name input available
        if (
          this.props.input !== "" &&
          item.Name.toLowerCase() === this.props.input.toLowerCase() &&
          this.props.tags.length === 0
        ) {
          searchedArray.push(item);
        }
        // only tags available
        else if (this.props.tags.length !== 0 && this.props.input === "") {
          var count: number = 0;
          this.props.tags.forEach((tagItem) => {
            if (item.tags.includes(tagItem.Name)) {
              count++;
            }
          });
          if (count === this.props.tags.length) {
            searchedArray.push(item);
          }
        }
        //both tags and name available
        else if (this.props.tags.length !== 0 && this.props.input !== "") {
          if (item.Name.toLowerCase() === this.props.input.toLowerCase()) {
            var count: number = 0;
            this.props.tags.forEach((tagItem) => {
              if (item.tags.includes(tagItem.Name)) {
                count++;
              }
            });
            if (count === this.props.tags.length) {
              searchedArray.push(item);
            }
          }
        }
      });
    } else {
      alert("Filtered values not valid.Please try again.");
    }
    this.props.UpdateSeachList(searchedArray);
  };

  showImages = (value: string) => {
    this.props.vehicleResults.forEach((vehicle) => {
      if (vehicle.id === value) {
        this.setState({ leftPanelSelect: vehicle }, () => {
          console.log(vehicle);
        });
      }
    });
  };

  render() {
    const style = {
      multiselectContainer: {
        width: "100%",
      },
    };
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.leftPanel}>
            {/* Filter options starts here */}
            <h3 className={styles.header_1} style={{}}>
              Select Category
            </h3>
            <div className={styles.categoryName}>
              <DropdownList
                id="categoryDropdown"
                optionList={optionList}
                onGetSelectedOption={this.onCategorySelect}
              />
            </div>
            <h3 style={{ textDecoration: "underline", textAlign: "left" }}>
              Filters
            </h3>
            <div id="form_filter" className={styles.filters}>
              <div>
                <h5 style={{ marginBottom: "5px", textAlign: "left" }}>Name</h5>
                <InputText
                  id="vehicle_name"
                  isDisabled={false}
                  getInputTextValue={() => {}}
                  inputTextValidation={() => {}}
                />
              </div>
              <h5 style={{ marginBottom: "5px", textAlign: "left" }}>Tags</h5>
              <Multiselect
                style={style}
                options={tagNames}
                selectedValues={""}
                onSelect={this.onSelect}
                displayValue="Name"
              />
              <div className={styles.buttons}>
                <span className={styles.buttons_filter}>
                  <Button label="Filter" onButtonClick={this.onfilter} />
                </span>
                <span className={styles.buttons_clear}>
                  <Button onButtonClick={this.clearFields} label="Clear" />
                </span>
              </div>
              {/* Results panel starts here */}
              <h3 className={styles.header_results}>Results</h3>
              <ListPanel
                results={this.props.searchList}
                showImages={this.showImages}
              />
            </div>
          </div>
          {/* Image viewer starts here */}
          <div className={styles.rightPanel}>
            <ImageViewer vehicle={this.state.leftPanelSelect} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleResults: state.vehicleResults,
    tags: state.tags,
    input: state.input,
    searchList: state.searchList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateVehicles: (vehicleData: Vehicle[]) =>
      dispatch(updateVehicles(vehicleData)),

    updateTags: (tags: Option[]) => {
      dispatch(updateTags(tags));
    },

    updateInputText: (input: string) => {
      dispatch(updateTags(input));
    },

    UpdateSeachList: (vehicleSeachList: Vehicle[]) => {
      dispatch(UpdateSeachList(vehicleSeachList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
