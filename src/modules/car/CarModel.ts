import { applySnapshot, types, flow } from "mobx-state-tree";
import { IInput } from "constants/interface";
import { ServiceModel } from "modules/service/ServiceModel";
import { carAPI } from "./CarService";
import { date_display_CE_TO_BE } from "utils/getDateFormat";

export const CarModel = types
  .model("CarModel", {
    brand: types.optional(types.string, ""),
    model: types.optional(types.string, ""),
    image: types.optional(types.string, ""),
    vehicleNumber: types.optional(types.string, ""),
    vehicleProvince: types.optional(types.string, ""),
    color: types.optional(types.string, ""),
    miles: types.optional(types.number, 0),
    nextService: types.optional(ServiceModel, {}),
    serviceHistory: types.optional(types.array(ServiceModel), [])
  })
  .views(self => ({
    get nextServiceDate() {
      return self.nextService.date;
    },
    get lastServiceDate() {
      return self.serviceHistory.length > 0
        ? date_display_CE_TO_BE(self.serviceHistory[0].date)
        : "-";
    },
    get firstServiceDate() {
      return self.serviceHistory.length > 0
        ? date_display_CE_TO_BE(
            self.serviceHistory[self.serviceHistory.length - 1].date
          )
        : "-";
    }
  }))
  .actions((self: any) => ({
    getMyCarInfo: flow(function*() {
      try {
        const result = yield carAPI.getMyCarInfo();
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
export type ICarModel = typeof CarModel.Type;
