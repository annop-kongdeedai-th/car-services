import * as React from "react";
import { Typography, TypographyProps } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";

export interface IText extends TypographyProps {
  textColor?: string;
  bold?: boolean;
}
class Text extends React.Component<IText> {
  public render() {
    const { style, textColor, bold, children, ...rest } = this.props;

    return (
      <Typography style={{ ...this.getStyle(), ...style }} {...rest}>
        {children}
      </Typography>
    );
  }

  private getStyle = () => {
    const { textColor, bold } = this.props;
    const styles: CSSProperties = {};

    if (textColor) {
      styles.color = textColor;
    }
    if (bold) {
      styles.fontWeight = "bold";
    }

    return styles;
  };
}

export default Text;
