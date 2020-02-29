import { applySnapshot, types } from "mobx-state-tree";

export const AuthModel = types
  .model("AuthModel", {
    email: types.optional(types.string, ""),
    password: types.optional(types.string, "")
  })
  .views((self: any) => ({
    //
  }))
  .actions((self: any) => ({
    setField: (fieldName: string, value: any) => {
      self[fieldName] = value;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));

export type IAuthModel = typeof AuthModel.Type;
export const authStore = AuthModel.create();
