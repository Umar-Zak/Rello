import  React, {useState} from 'react';
import { AnyAction } from 'redux';
import styled from 'styled-components/native';
import SearchField from '../components/SearchField';
import { useAppDispatch, useAppSelector } from '../hooks/CustomReduxHooks';
import ProductVerificationModal from '../components/ProductVerificationModal';
import OverlayModal from '../components/OverlayModal';
import { loadBrands} from '../store/entities/ProductAuthSlice';
import FlatList from '../components/FlatList';


const ProductListScreen = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [searchText, setSearchText] = useState("")
    let brands = useAppSelector(({entities: {productAuth}}) => productAuth.brands)
    const verificationModalOffset = useAppSelector(({ui}) => ui.verificationModalOffset)
    const dispatch = useAppDispatch()
    

    const handleRefresh = async() => {
        setRefreshing(true)
        await dispatch(loadBrands as unknown as AnyAction)
        setRefreshing(false)
    }

 
    return (
        <RootContainer>
        {verificationModalOffset === 20 && <OverlayModal/>}
        <ProductVerificationModal/>
        <Container>
            <SearchField
                handleSearch={(text) => setSearchText(text)}
                placeholder="Search for brand"
            />
            <FlatList
            data={brands}
            handleRefresh={handleRefresh}
            type="auth"
            refreshing={refreshing}
            />
        </Container>
        </RootContainer>
    )
}
 
export default ProductListScreen;

const Container = styled.View`
 flex: 1;
 padding: 20px;
`

const RootContainer = styled.View`
 flex: 1;
`



