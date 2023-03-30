import * as React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import {Dimensions, Text, SafeAreaView} from "react-native"
const width = Dimensions.get("screen").width - 30
const height = Dimensions.get("screen").height

interface SkeletonInterface{
    isLoading: boolean
}
const Skeleton = ({isLoading}: SkeletonInterface) => {
    return ( 
     <SkeletonContent
      containerStyle={{ flex: 1, width: 100, marginLeft: 15, marginTop: 40}}
      isLoading={isLoading}
      layout={[
        { key: 'key1',  width, height: 70, marginBottom: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        children: [
            {key: "childone", height: 40, width: 40, borderRadius: 20},
            {key: "childtwo", height: 30, width: 100},
            {key: "childthree", height: 30, width: 40}
        ] 
    },
        { key: 'key2',  width, marginVertical: 15,
         flexDirection: "row",alignItems: "center", 
         justifyContent: "space-around",
        children: [
            {key: "service1", width: 130, height: 130, borderRadius: 20},
            {key: "service2", width: 130, height: 130, borderRadius: 20}
        ]
     },

     { key: 'key3',  width,  marginVertical: 15,
         flexDirection: "row",alignItems: "center", 
         justifyContent: "space-around",
        children: [
            {key: "service3", width: 130, height: 130, borderRadius: 20},
            {key: "service4", width: 130, height: 130, borderRadius: 20}
        ]
     },
     { key: 'key4',  width,  marginVertical: 15,
     flexDirection: "row",alignItems: "center", 
     justifyContent: "space-around",
    children: [
        {key: "service5", width: 130, height: 130, borderRadius: 20},
        {key: "service6", width: 130, height: 130, borderRadius: 20}
    ]
 }
      ]}
      animationDirection="horizontalLeft"
    >
    </SkeletonContent>
     );
}
 
export default Skeleton;