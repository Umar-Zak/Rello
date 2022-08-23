import React, {useState} from 'react';
import { StyleSheet, Dimensions} from 'react-native'
import MapView from 'react-native-maps';
function Map() {
    const [coords, setCoords] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    return (
        <MapView
             style={styles.map}
             initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              />
    );
}

export default Map;

const styles =StyleSheet.create({
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    }
})