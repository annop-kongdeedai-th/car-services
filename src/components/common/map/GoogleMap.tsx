import React from "react";
import GoogleMapReact, { Props } from "google-map-react";
import { Marker } from "..";
import { IAddressModel } from "modules/auth/AddressModel";

const API_KEY: string = process.env.REACT_APP_GOOGLE_API_KEY as string;

interface IGoogleMap extends Props {
  address: IAddressModel;
  mapHeight?: string | number;
}
class GoogleMap extends React.Component<IGoogleMap> {
  public render() {
    const {
      address,
      mapHeight,
      bootstrapURLKeys,
      yesIWantToUseGoogleMapApiInternals,
      defaultCenter,
      defaultZoom,
      ...rest
    } = this.props;
    return (
      <div style={{ height: mapHeight || 300, ...styles.mapStyle }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY
          }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={{
            lat: address.latitude || 13.765221,
            lng: address.longitude || 100.538317
          }}
          defaultZoom={11.0}
          {...rest}
        >
          <Marker lat={address.latitude} lng={address.longitude} />
        </GoogleMapReact>
      </div>
    );
  }
}

const styles = {
  mapStyle: {
    width: "100%"
  }
};

export default GoogleMap;
