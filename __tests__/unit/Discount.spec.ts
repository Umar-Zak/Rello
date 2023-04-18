import { DiscountInterface, SubscribedDiscount } from './../../src/models/DTOS';
import { AnyAction } from "redux";
import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"
import store from "../../src/store/Store";
import {loadDiscountCards, selectDiscount,loadSubscribedDiscounts, subscribeDiscount, loadDiscountTransactions} from "../../src/store/entities/DiscountSlice"



const mockAdapter = new AxiosMockAdapter(axios)

const sampleDiscount: DiscountInterface = {
    _id: "_id",
    address: "Address",
    companyname: "Company x",
    contacts: "0550103718",
    createdAt: new Date(),
    count: 20,
    details: "Details",
    discountid: "id",
    discountype: "Type",
    id: "id",
    image: "image",
    location: [{_id: "id",latitude: "00000", longitude: "0000"}],
    merchantcode: "merchant code",
    percentage: 3,
    updatedAt: new Date(),
    clientcode: "0550103718"
}

const merchantDiscounts = [sampleDiscount]

const subscribedDiscount: SubscribedDiscount = {
    address: "Address",
    companyname: "Company x",
    discountid: "id",
    discountype: "Type",
    image: "image",
    merchantcode: "merchant code",
    percentage: 3,
    clientcode: "0550103718"
}

describe("Discount Slice", () => {

    beforeEach(() => {
        let url = new RegExp(`/customer/*`)
        mockAdapter.onGet(url).replyOnce(200, [subscribedDiscount])
    })

    

    it("Should load discounts cards available from server", async() => {
        mockAdapter.onGet("/merchantdiscount/findall")
        .reply(200, merchantDiscounts)
        await store.dispatch(loadDiscountCards() as unknown as AnyAction)
        const discounts = store.getState().entities.discount.discounts
        expect(discounts.length).toBeGreaterThan(0)
    })


    it("Should select a discount card", async() => {
        await store.dispatch(selectDiscount(sampleDiscount) as unknown as AnyAction)
        const selectedDis = store.getState().entities.discount.selectedDiscount
        expect(selectedDis).toBe(sampleDiscount)
    })

    it("Should subsribe to a discount card", async() => {
        mockAdapter.onPost("/customerdiscount").reply(200, subscribedDiscount)
        await store.dispatch(subscribeDiscount(subscribedDiscount) as unknown as AnyAction)
        expect(store.getState().entities.discount.subscribedDiscounts).toContainEqual(subscribedDiscount)
    })

    it("Should raise an exception if subsription was not successfull", async() => {
        mockAdapter.onPost("/customerdiscount").reply(400, {})
        await store.dispatch(subscribeDiscount(subscribedDiscount) as unknown as AnyAction)
        expect(store.getState().entities.discount.subscribedDiscounts.length).toBe(1)
    })

    it("Should get user's subscribed discounts", async() => {
        
        const urltwo = new RegExp(`/customerdiscount/findclient/*`)
        
        mockAdapter
        .onGet(urltwo).reply(200, [subscribedDiscount])
       
        await store.dispatch(loadSubscribedDiscounts() as unknown as AnyAction)
        expect(store.getState().entities.discount.subscribedDiscounts.length).toBe(1)
    })


    it("Should raise an exception if the user is not able to fetch subscriptions", async() => {
        const url = new RegExp(`/customerdiscount/findclient/*`)
        mockAdapter.onGet(url).reply(400, {})
        await store.dispatch(loadSubscribedDiscounts() as unknown as AnyAction)
        expect(store.getState().entities.discount.subscribedDiscounts.length).toBe(1)
    })

    it("Should load transactions made on discount cards", async() => {
        const url = new RegExp("/transactiondiscount/findclient/*")
        
        mockAdapter.onGet(url).reply(200, [subscribedDiscount])
        await store.dispatch(loadDiscountTransactions() as unknown as AnyAction)
        expect(store.getState().entities.discount.discountTransactions.length).toBe(1)
    })

    it("Should raise an exception if user's transaction can't be loaded", async() => {
        const url = new RegExp("/transactiondiscount/findclient/*")
        mockAdapter.onGet(url).reply(400, {})
       await store.dispatch(loadDiscountTransactions() as unknown as AnyAction)
       expect(store.getState().entities.discount.discountTransactions.length).toBe(1)
    })
})