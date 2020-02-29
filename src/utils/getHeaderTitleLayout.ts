import { Pathname } from "history";

export const getHeaderTitleLayout = (pathname: Pathname) => {
  if (pathname.includes("/home")) {
    return "หน้าหลัก";
  } else if (pathname.includes("/service-history")) {
    return "ประวัติที่เคยเข้ารับบริการ";
  }
};
