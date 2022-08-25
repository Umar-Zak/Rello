import * as React from 'react';
import renderer from "react-test-renderer"
import NoSearchResult from '../src/components/NoSearchResult';
import "jest-styled-components"

describe("", () => {
    it("has 1 child", () => {
       const tree = renderer.create(<NoSearchResult/>).toJSON()
       expect(tree).toMatchSnapshot()
       //@ts-ignore
       expect(tree.children.length).toBe(1)
    })
})