import React, {useState, useEffect} from 'react';
import {Dimensions, Animated} from "react-native"
import {AntDesign} from "@expo/vector-icons"
import {LineChart} from "react-native-chart-kit";
import styled from 'styled-components/native';
import {useSelector, useDispatch} from "react-redux"
import { AnyAction } from 'redux';
import {LoyaltyTransaction} from "../models/DTOS"
import {groupLoTransaction } from '../utils/Common'
import {closeGraph} from "../store/ui/UI"



const TransactionsChart = () => {
    const dispatch = useDispatch()
    const offset = useSelector<any, number>((state: any) => state.ui.graphOffset)
    const [top] = useState(new Animated.Value(offset))
    const loyaltyTransactions = useSelector<any, LoyaltyTransaction[]>((state): any => state.entities.loyalty.loyaltyTransactions) 


    useEffect(() => {
        Animated.spring(top, {toValue: offset, useNativeDriver: false})
        .start()
    }, [offset])


    const groupedLoyaltyTrans = groupLoTransaction(loyaltyTransactions)
    const merchants = Object.keys(groupedLoyaltyTrans)

    const data = {
        labels: merchants,
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
            ]
          }
        ]
      }


    return ( 
        <AnimatedContainer style={{
            top: top
        }}>
    <CloseIcon onPress={() => dispatch(closeGraph() as unknown as AnyAction)}>
    <AntDesign name="close" size={30} color="#28c8a4" />
    </CloseIcon>
    <LineChart
    data={data}
    width={width} 
    height={height}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} 
    chartConfig={config}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </AnimatedContainer>
     );
}
 
export default TransactionsChart;

const config = {
    backgroundColor: "#002147",
    backgroundGradientFrom: "#002147",
    backgroundGradientTo: "#002147",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  const width = Dimensions.get("window").width 
  const height = Dimensions.get("window").height
  
  
  const Container = styled.SafeAreaView`
  background: #002147;
  position: absolute;
  left: 0;
  z-index: 100;
  `

  const CloseIcon = styled.TouchableOpacity`
   position: absolute;
   top: 60px;
   right: 20px;
   z-index: 100;
  `

  const AnimatedContainer = Animated.createAnimatedComponent(Container)
  
  