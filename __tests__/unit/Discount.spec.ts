import store from "../../src/store/Store";
import {loadDiscountCards} from "../../src/store/entities/DiscountSlice"
import { AnyAction } from "redux";



describe("Discount Slice", () => {
    it("Should load discounts cards available from server", async() => {
        await store.dispatch(loadDiscountCards() as unknown as AnyAction)
       expect(store.getState().entities.discount.discounts.length).toBeGreaterThan(0)
    })
})