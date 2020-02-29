import * as React from "react";
import { rowLayoutH, rowLayoutV } from "../../../constants/TYPES";

interface IRow {
  layoutH?: rowLayoutH;
  layoutV?: rowLayoutV;
  style?: any;
}

class Row extends React.Component<IRow> {
  public render() {
    const { children, style } = this.props;

    return (
      <div style={{ ...styles.container, ...this.getLayout(), ...style }}>
        {children}
      </div>
    );
  }

  private getLayout = () => {
    const { layoutH, layoutV } = this.props;
    const layout: any = {};
    switch (layoutH) {
      case "left":
        layout.justifyContent = "flex-start";
        break;
      case "right":
        layout.justifyContent = "flex-end";
        break;
      case "spaceAround":
        layout.justifyContent = "space-around";
        break;
      case "spaceBetween":
        layout.justifyContent = "space-between";
        break;
    }
    switch (layoutV) {
      case "center":
        layout.alignItems = "center";
        break;
      case "bottom":
        layout.alignItems = "flex-end";
        break;
    }
    return layout;
  };
}
const styles = {
  container: { display: "flex", flexDirection: "row" }
};
export default Row;
