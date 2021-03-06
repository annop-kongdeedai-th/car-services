import { Pathname } from "history";

export const getHeaderTitleLayout = (pathname: Pathname) => {
  if (pathname.includes("/home")) {
    return "หน้าหลัก";
  } else if (pathname.includes("/service-history")) {
    if (pathname.includes("/service-history/")) {
      return "แผนที่";
    } else {
      return "ประวัติที่เคยเข้ารับบริการ";
    }
  }
};
