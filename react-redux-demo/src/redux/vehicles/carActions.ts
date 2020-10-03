import { UPDATE_VEHICLES, UPDATE_INPUT, TAGS, SEARCH_LIST } from "./carTypes";

export const updateVehicles = (vehicleData) => {
  return { type: UPDATE_VEHICLES, payload: vehicleData };
};

export const updateInputText = (input:string) => {
  return { type: UPDATE_INPUT, payload: input };
};

export const updateTags = (tags) => {
  return { type: TAGS, payload: tags };
};

export const UpdateSeachList = (searchList) => {
  return { type: SEARCH_LIST, payload: searchList };
};
