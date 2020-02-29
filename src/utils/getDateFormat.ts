import moment from "moment";
import "moment/locale/th";

export type formatDateType =
  | "DD MMM"
  | "DD MMM YYYY"
  | "DD MMMM"
  | "DD MMMM YYYY"
  | "MMDDYYYY"
  | "DD/MM/YYYY"
  | "YYYY/MM/DD"
  | "DDMMYYYY"
  | "MM/DD/YYYY"
  | "ll";

export const date_display_CE_TO_BE = (
  value: string | Date,
  targetFormat?: formatDateType
) => {
  let date;

  date = moment(value, "YYYY/MM/DD");

  return date && date.isValid()
    ? date.add("years", 543).format(targetFormat || "DD MMMM YYYY")
    : "";
};
