import * as React from "react";
import Text, { IText } from "./Text";
import { date_display_CE_TO_BE, formatDateType } from "utils/getDateFormat";

interface IDateText extends IText {
  formatDate?: formatDateType;
  children: any;
}
class DateText extends React.Component<IDateText> {
  public render() {
    const { formatDate, children, ref, ...rest } = this.props;

    return <Text {...rest}>{date_display_CE_TO_BE(children, formatDate)}</Text>;
  }
}

const styles = {
  titleStyle: {}
};
export default DateText;
