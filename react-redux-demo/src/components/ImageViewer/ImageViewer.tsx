import React, { FunctionComponent } from "react";
import styles from "./imageviewer.module.scss";
import { connect } from "react-redux";
import { updateVehicles } from "../../redux";

type Vehicle = {
  id: string;
  type: string;
  Name: string;
  url: string;
  tags: string[];
};

interface Props {
  vehicle: Vehicle;
  vehicleResults: Vehicle[];
  removeVehicle: () => void;
  updateVehicles: (any) => void;
}

const ImageViewer: FunctionComponent<Props> = (props) => {
  const removeVehicle = () => {
    props.vehicleResults.forEach((item, i) => {
      if (item.id === props.vehicle.id) {
        props.vehicleResults.splice(i, 1);
      }
    });
    props.updateVehicles(props.vehicleResults);
  };

  return (
    <div>
      <button className={styles.close_btn} onClick={removeVehicle}>
        X
      </button>
      <img className={styles.image} src={props.vehicle.url} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vehicleResults: state.vehicleResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateVehicles: (vehicles: string) => dispatch(updateVehicles(vehicles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);
