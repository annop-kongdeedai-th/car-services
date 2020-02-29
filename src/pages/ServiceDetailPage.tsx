import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IAuthModel } from "modules/auth/AuthModel";
import { IAppModel } from "AppModel";
import { StyleSheet } from "constants/interface";
import { Grid, Row, Text, GoogleMap } from "components/common";
import { ServiceModel } from "modules/service/ServiceModel";
import { GoLocation } from "react-icons/go";
import { AiOutlineCompass, AiOutlineMessage } from "react-icons/ai";
import { COLORS } from "constants/index";
import { FaPhoneVolume, FaUserNurse } from "react-icons/fa";

interface IServiceDetailPage extends RouteComponentProps<any> {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject("appStore", "authStore")
@observer
class ServiceDetailPage extends Component<IServiceDetailPage> {
  private service = ServiceModel.create({});

  async componentDidMount() {
    const { match, appStore } = this.props;
    try {
      const id = match.params.id;
      appStore!.setLoading(true);
      await this.service.getServiceDetail(+id);
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
            <Row
              layoutH={"spaceBetween"}
              layoutV={"center"}
              style={styles.rowStyle}
            >
              <GoLocation size={30} />
              <div>
                <Text textColor={COLORS.darkGrey}>
                  {this.service.location.locationDescription}
                </Text>
              </div>
              <AiOutlineCompass size={30} />
            </Row>
            <GoogleMap address={this.service.location} />
            <Row layoutH={"spaceAround"} style={styles.rowStyle}>
              <div style={styles.iconWithTextStyle}>
                <FaPhoneVolume size={30} />
                <Text textColor={COLORS.yellow}>{"เบอร์โทร"}</Text>
              </div>
              <div style={styles.iconWithTextStyle}>
                <AiOutlineMessage size={30} />
                <Text textColor={COLORS.yellow}>{"เบอร์โทร"}</Text>
              </div>
            </Row>
            <Row
              layoutH={"spaceAround"}
              layoutV={"center"}
              style={styles.rowStyle}
            >
              <FaUserNurse size={40} style={styles.staffIconStyle} />
              <Text
                textColor={COLORS.white}
                style={styles.clickToStaffTextStyle}
              >
                {"คลิกเพื่อโทรหาเจ้าหน้าที่"}
              </Text>
            </Row>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const styles: StyleSheet = {
  rowStyle: {
    paddingTop: 30,
    paddingBottom: 30
  },
  iconWithTextStyle: {
    textAlign: "center"
  },
  staffIconStyle: {
    marginRight: 8
  },
  clickToStaffTextStyle: {
    backgroundColor: COLORS.green,
    width: "100%",
    height: "100%",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
};
export default ServiceDetailPage;
