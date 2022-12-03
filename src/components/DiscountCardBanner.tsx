import * as React from 'react';
import styled from 'styled-components/native';
import { DiscountInterface } from '../models/DTOS';


const DiscountCardBanner = (discount: DiscountInterface) => {
    
    return ( 
        <Image resizeMode="cover" source={{uri: discount.image}} />
    );
}
 
export default DiscountCardBanner;

const Image = styled.Image`
    width: 100%;
    height: 250px;
    
`