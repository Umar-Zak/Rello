import React from "react";
import {render} from "react-native-testing-library"
import "jest-styled-components"
import NoSearchResult from "../../src/components/NoSearchResult"

describe("No Search Result", () => {

    it("Should render correctly", () => {
       const snapshot =  render(
            <NoSearchResult/>
        ).toJSON()

        expect(snapshot).toMatchSnapshot()
    })
})