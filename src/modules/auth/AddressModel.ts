import { applySnapshot, types } from "mobx-state-tree";

export const AddressModel = types
  .model("AddressModel", {
    latitude: types.optional(types.number, 0),
    longitude: types.optional(types.number, 0)
  })
  .views((self: any) => ({
    get coordinate(): any {
      return { lat: self.latitude, lng: self.longitude };
    },
    get fullAdress() {
      if (self.latitude && self.longitude) {
        return `${self.latitude}, ${self.longitude}`;
      } else {
        return "";
      }
    }
  }))
  .actions((self: any) => ({
    setLatLong: (latitude: number, longitude: number) => {
      self.latitude = latitude;
      self.longitude = longitude;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type IAddressModel = typeof AddressModel.Type;
