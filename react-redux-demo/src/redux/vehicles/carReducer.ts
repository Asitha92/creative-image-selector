import { UPDATE_VEHICLES, UPDATE_INPUT, TAGS, SEARCH_LIST } from "./carTypes";

type Tag = {
  id: string;
  Name: string;
};

type Vehicle = {
  id: string;
  type: string;
  Name: string;
  url: string;
  tags: Tag[];
};

export interface VehicleState {
  vehicleResults: any[];
  input: string;
  tags: Tag[];
}

const initialState = {
  vehicleResults: [],
  input: "",
  tags: [],
  leftPanelSelect: "",
  searchList: [],
};

const carReducer = (state: VehicleState = initialState, action) => {
  switch (action.type) {
    case UPDATE_VEHICLES:
      console.log("action payload", action.payload);
      return {
        ...state,
        vehicleResults: action.payload,
      };
    case UPDATE_INPUT:
      console.log("action payload", action.payload);
      return {
        ...state,
        input: action.payload,
      };
    case TAGS:
      console.log("action payload", action.payload);
      return {
        ...state,
        tags: action.payload,
      };
    case SEARCH_LIST:
      console.log("action payload", action.payload);
      return {
        ...state,
        searchList: action.payload,
      };

    default:
      return state;
  }
};

export default carReducer;
