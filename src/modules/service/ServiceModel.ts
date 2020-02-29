import { applySnapshot, types } from "mobx-state-tree";
import { IInput } from "constants/interface";
import { AddressModel } from "modules/auth/AddressModel";

export const ServiceModel = types
  .model("ServiceModel", {
    description: types.optional(types.string, ""),
    location: types.optional(AddressModel, {}),
    distance: types.optional(types.number, 0),
    price: types.optional(types.number, 0),
    date: types.optional(types.string, "")
  })
  .views((self: any) => ({
    //
  }))
  .actions((self: any) => ({
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type IServiceModel = typeof ServiceModel.Type;
