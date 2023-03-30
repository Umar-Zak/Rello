import * as React from 'react';
import ExpoFastImage from 'expo-fast-image'
import { DiscountInterface } from '../models/DTOS';


const DiscountCardBanner = (discount: DiscountInterface) => {
    
    return ( 
      <>
      { discount.image &&
        <ExpoFastImage
        uri={discount.image}
        cacheKey={discount.image.substring(35)} 
        style={{
            width: "100%",
            height: 250
            }} 
        /> 
      }
      </>
    );
}
 
export default DiscountCardBanner;

