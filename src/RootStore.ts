import { authStore } from "modules/auth/AuthModel";
import { AppModel } from "AppModel";

const appStore = AppModel.create({});

const RootStore = {
  appStore,
  authStore
};

export default RootStore;
