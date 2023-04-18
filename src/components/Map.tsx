import React, {useState} from "react";
import { StyleSheet, Dimensions} from "react-native"
import  MapView, {Marker} from "react-native-maps";
import { Coordinates } from "../models/DTOS";

interface MapInterface {
    coordinates?: Coordinates[]
    companyname: string
}

// const testcoords = [
//     {
//         latitude: 5.673899696885459,
//         longitude:  -0.12964515839245375,
//     },
//     {
//         latitude: 5.6394715971756515,
//         longitude:  -0.13591427834770073,
//     },
//     {
//         latitude: 5.586373035412458,
//         longitude: -0.16721031703960718,
//     },
// ]



function Map({companyname}: MapInterface) {
    const [coords] = useState({
        latitude: 5.634309652069938,
        longitude:  -0.14762310410696564,
    })
    
    
    return (
        <MapView
        style={styles.map}
        initialRegion={{
        latitude:coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
        >
            {/* {
                testcoords.map((cord, index )=> (
                    <Marker
                    key={index}
                    title={companyname}
                    description="Locate us here"
                    coordinate={{"latitude":cord.latitude,"longitude":cord.longitude}}
                />
                ))
            } */}
             <Marker
                    title={companyname}
                    description="Locate us here"
                    coordinate={{"latitude":coords.latitude,"longitude":coords.longitude}}
                />
        </MapView>
    );

    
}

export default Map;

const styles =StyleSheet.create({
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100
    }
})