import * as React from 'react';
import {SafeAreaView,Dimensions} from "react-native"
import {
    LineChart,
  } from "react-native-chart-kit";

  import {useSelector} from "react-redux"
  import {LoyaltyTransaction} from "../models/DTOS"
  import {groupLoTransaction } from '../utils/Common'

const TransactionsChart = () => {
    const loyaltyTransactions = useSelector<any, LoyaltyTransaction[]>((state): any => state.entities.loyalty.loyaltyTransactions) 

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
        <SafeAreaView style={{
            backgroundColor: "#002147"
        }}>
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
        </SafeAreaView>
     );
}
 
export default TransactionsChart;

const config = {
    backgroundColor: "#002147",
    backgroundGradientFrom: "#002147",
    backgroundGradientTo: "#002147",
    decimalPlaces: 2, // optional, defaults to 2dp
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