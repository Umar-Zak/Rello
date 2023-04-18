import {Component} from "react";
import styled from "styled-components/native";
import AppErrorComponent from "./AppErrorComponent";


export default class ErrorBoundary extends Component {
    state = {hasError: false}
    static getDerivedStateFromError(){
        return {hasError: true}
    }

    render() {
      
        if(this.state.hasError) 
       
        return(
          <Container>
            <AppErrorComponent/>
            <ErrorText>Oops, an error occurred</ErrorText>
        </Container>
            )
       
        return this.props.children
    }
}

const Container = styled.SafeAreaView`
 flex: 1;
 justify-content: center;
 align-items: center;
`

const ErrorText = styled.Text`

`