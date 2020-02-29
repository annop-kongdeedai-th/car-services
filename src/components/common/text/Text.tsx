import * as React from "react";
import { Typography, TypographyTypeMap } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

interface IText extends OverridableComponent<TypographyTypeMap> {
  textColor?: string;
  bold?: boolean;
  style?: CSSProperties;
}
class Text extends React.Component<IText> {
  public render() {
    const { style, children } = this.props;

    return (
      <Typography style={{ ...this.getStyle(), ...style }}>
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
