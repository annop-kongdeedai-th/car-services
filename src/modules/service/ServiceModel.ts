import { applySnapshot, types, flow } from "mobx-state-tree";
import { IInput } from "constants/interface";
import { AddressModel } from "modules/auth/AddressModel";
import { serviceAPI } from "./ServiceService";

export const ServiceModel = types
  .model("ServiceModel", {
    id: types.optional(types.number, 0),
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
    getServiceDetail: flow(function*(id: number) {
      try {
        const result = yield serviceAPI.getServiceDetail(id);
        self.setAllField(result);
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    setAllField: (data: any) => {
      Object.keys(data).forEach(key => {
        try {
          self[key] = data[key];
        } catch (e) {
          console.log(e);
        }
      });
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type IServiceModel = typeof ServiceModel.Type;
