import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IAuthModel } from "modules/auth/AuthModel";
import { IAppModel } from "AppModel";
import { StyleSheet } from "constants/interface";
import { Grid, Text, Row, DateText } from "components/common";
import { COLORS, IMAGES } from "../constants";
import { CarModel } from "modules/car/CarModel";
import { List, ListItem } from "@material-ui/core";
import { IServiceModel } from "modules/service/ServiceModel";
import { currency } from "utils";
import { GoLocation } from "react-icons/go";

interface IServiceHistoryPage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject("appStore", "authStore")
@observer
class ServiceHistoryPage extends Component<IServiceHistoryPage> {
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
          <Grid item computer={4} tablet={6} mobile={12}>
            <Text
              style={styles.textHeaderStyle}
            >{`${this.myCar.serviceHistory.length} รายการ (${this.myCar.firstServiceDate} - ${this.myCar.lastServiceDate})`}</Text>
            {this.myCar.serviceHistory.map(
              (service: IServiceModel, index: number) =>
                this.renderHistoryInfoSection(service, index)
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private renderHistoryInfoSection = (
    service: IServiceModel,
    index: number
  ) => {
    return (
      <Row
        layoutH={"spaceBetween"}
        style={styles.contentContainerStyle}
        key={index}
      >
        <Row>
          <img src={IMAGES.carOnTheRoad} style={styles.imageStyle} />
          <List>
            <ListItem>
              <Text variant={"body1"} bold>
                {service.description}
              </Text>
            </ListItem>
            <ListItem>
              <Row>
                <GoLocation size={20} color={COLORS.darkGrey} />
                <Text variant={"body2"} textColor={COLORS.darkGrey}>
                  {service.location.locationName}
                </Text>
              </Row>
            </ListItem>
            <ListItem>
              <Text variant={"body2"} textColor={COLORS.darkGrey}>
                {`ระยะทาง ${currency(service.distance)} km`}
              </Text>
            </ListItem>
          </List>
        </Row>
        <List>
          <ListItem style={styles.listItemAlignEnd}>
            <DateText
              variant={"body2"}
              textColor={COLORS.darkGrey}
              formatDate={"ll"}
            >
              {service.date}
            </DateText>
          </ListItem>
          <ListItem style={styles.listItemAlignEnd}>
            <Text
              textColor={COLORS.darkGrey}
              variant={"body2"}
            >{`THB ${currency(service.price)}`}</Text>
          </ListItem>
        </List>
      </Row>
    );
  };
}
const styles: StyleSheet = {
  textHeaderStyle: {
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  imageStyle: {
    width: 50
  },
  listItemAlignEnd: {
    justifyContent: "flex-end"
  }
};
export default ServiceHistoryPage;
