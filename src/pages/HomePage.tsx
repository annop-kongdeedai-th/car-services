import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
  List
} from "@material-ui/core";
import { IAuthModel } from "modules/auth/AuthModel";
import { IAppModel } from "AppModel";
import { StyleSheet } from "constants/interface";
import { Grid, Text } from "components/common";
import { COLORS } from "../constants";
import { FaCar, FaCreditCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GiPaintBucket } from "react-icons/gi";
import { IoMdSpeedometer } from "react-icons/io";
import { currency } from "utils";
import { CarModel } from "modules/car/CarModel";

interface IHomePage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject("appStore", "authStore")
@observer
class HomePage extends Component<IHomePage> {
  private myCar = CarModel.create({});

  async componentDidMount() {
    const { appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await this.myCar.getMyCarInfo();
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  }

  public render() {
    return (
      <Grid container>
        <Grid item container justify={"center"}>
          <Grid item computer={4} tablet={8} mobile={12}>
            <img src={this.myCar.image} style={styles.imageStyle} />
            <List>
              <ListItem>
                <Text bold>{this.myCar.model}</Text>
              </ListItem>
              <ListItem>
                <Text textColor={COLORS.green}>
                  {`เข้ารับบริการครั้งต่อไป ${this.myCar.nextServiceDate}`}
                </Text>
              </ListItem>
              <ListItem style={styles.fullWidthListItemStyle}>
                {this.renderDetailSection()}
              </ListItem>
              <ListItem>
                <Text textColor={COLORS.blue}>
                  {`เข้ารับบริการครั้งล่าสุด ${this.myCar.lastServiceDate}`}
                </Text>
              </ListItem>
              <ListItem style={styles.fullWidthListItemStyle}>
                <TextareaAutosize
                  placeholder={"Note..."}
                  style={styles.textAreaStyle}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private renderIconWithLabel = (icon: any, label: string) => {
    return (
      <Grid item computer={4} tablet={12} mobile={12}>
        <List disablePadding>
          <ListItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        </List>
      </Grid>
    );
  };

  private renderDetailSection = () => {
    return (
      <Grid container style={styles.detailContainerStyle}>
        {this.renderIconWithLabel(<FaCar size={30} />, this.myCar.model)}
        {this.renderIconWithLabel(
          <FaCreditCard size={30} />,
          this.myCar.vehicleNumber
        )}
        {this.renderIconWithLabel(
          <GoLocation size={30} />,
          this.myCar.vehicleProvince
        )}
        {this.renderIconWithLabel(
          <GiPaintBucket size={30} />,
          this.myCar.color
        )}
        {this.renderIconWithLabel(
          <IoMdSpeedometer size={30} />,
          `${currency(this.myCar.miles)} km`
        )}
      </Grid>
    );
  };
}
const styles: StyleSheet = {
  imageStyle: {
    width: "100%"
  },
  detailContainerStyle: {
    border: `1px solid ${COLORS.black}`
  },
  textAreaStyle: {
    border: `1px solid ${COLORS.black}`,
    width: "100%",
    height: 150,
    resize: "none",
    padding: 0,
    overflow: "auto",
    outline: "none"
  },
  fullWidthListItemStyle: {
    paddingLeft: 0,
    paddingRight: 0
  }
};
export default HomePage;
