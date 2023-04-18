import * as React from "react";
import LottieView from "lottie-react-native";
const AppErrorComponent = () => {
    return ( 
        <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: "white",
        }}
        source={require("../assets/error.json")}
      />
     );
}
 
export default AppErrorComponent;