import * as React from "react";
import { Button as BaseButton } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { COLORS } from "../../../constants";
import { withRouter, RouteComponentProps } from "react-router";
import { StyleSheet } from "constants/interface";

interface ITextButton extends ButtonProps, RouteComponentProps<any> {
  autoShade?: boolean;
  textColor?: string;
  backgroundColor?: string;
  bordered?: boolean;
  fluid?: boolean;
  style?: any;
}

class TextButton extends React.Component<ITextButton> {
  public static defaultProps = {};
  public render() {
    const {
      textColor,
      backgroundColor,
      bordered,
      fluid,
      style,
      location,
      children,
      staticContext,
      ...rest
    } = this.props;
    const buttonStyles = this.getTextButtonStyle();
    return (
      <BaseButton
        style={{ ...styles.container, ...buttonStyles, ...style }}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }

  private getTextButtonStyle = () => {
    const { textColor, backgroundColor, fluid, bordered } = this.props;
    const styles: React.CSSProperties = {};

    if (bordered) {
      styles.border = `1px solid ${textColor || COLORS.lightBlue}`;
    }
    if (textColor) {
      styles.color = textColor;
    }
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor;
    }
    if (fluid) {
      styles.width = "100%";
    }

    return styles;
  };
}

const styles = {
  container: {}
};

export default withRouter(TextButton);
