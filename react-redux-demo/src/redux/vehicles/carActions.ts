import { UPDATE_VEHICLES, UPDATE_INPUT, TAGS } from "./carTypes";

export const updateVehicles = (vehicleData) => {
  return { type: UPDATE_VEHICLES, payload: vehicleData };
};

export const updateInputText = (input:string) => {
  return { type: UPDATE_INPUT, payload: input };
};

export const updateTags = (tags) => {
  return { type: TAGS, payload: tags };
};
