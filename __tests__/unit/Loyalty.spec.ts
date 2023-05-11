import axios from "axios";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AxisoMockAdapter from "axios-mock-adapter"
import { AnyAction} from "redux";
import { LoyaltyInterface, SubsribedLoyalty } from "../../src/models/DTOS";
import { createSubscription, loadLoyaltyCards, loadLoyaltyTransactions, loadSubscribedLoyalties } from "../../src/store/entities/LoyaltySlice";
import Store from "../../src/store/Store";
import reducer from "../../src/store/RootReducer"


let dispatch: typeof Store.dispatch 
let getState: typeof Store.getState
let store: typeof Store
const mockAdapter = new AxisoMockAdapter(axios)

const loyaltyCard: LoyaltyInterface = {
    _id: "_id",
    address: "Address",
    amount: 50,
    companyname: "company",
    contact: "0550103718",
    count: 12,
    createdAt: new Date(),
    details: "Details",
    image: "image",
    id: "id",
    location: [{_id: "",latitude: "", longitude: ""}],
    merchantcode: "merchantcode",
    point: 12,
    updatedAt: new Date()
}

const loyaltyCards = [loyaltyCard]

const subscribeLoyalty: SubsribedLoyalty = {
    address: "Address",
    amount: 50,
    companyname: "company",
    image: "image",
    merchantcode: "merchantcode",
    point: 12,
   clientcode: "code",
   loyaltyid: "id",
}

describe("Loyalty slice", () => {


    beforeEach(() => {
         store = configureStore({
            reducer,
            middleware: [...getDefaultMiddleware({
                serializableCheck: false
            })]
        })

        dispatch = store.dispatch
        getState = store.getState
        const url = new RegExp("/customer/*")
        mockAdapter.onGet(url).reply(200, [subscribeLoyalty])
    })



    it("Should load loyalty cards from server", async () => {
        mockAdapter.onGet("/merchantloyalty/findall").reply(200, loyaltyCards)
        await dispatch(loadLoyaltyCards() as unknown as AnyAction)
        const cards = getState().entities.loyalty.loyalties
        expect(cards.length).toBe(1)
    })

    it("Should fail to load loyalty cards from server", async () => {
        mockAdapter.onGet("/merchantloyalty/findall").reply(400, {})
        await dispatch(loadLoyaltyCards() as unknown as AnyAction)
        const cards = getState().entities.loyalty.loyalties
        expect(cards.length).toBe(1)
    })


    it("Should subscribe to a loyalty card", async () => {
        mockAdapter.onPost("/customerloyalty").reply(200, subscribeLoyalty)
        await dispatch(createSubscription(subscribeLoyalty) as unknown as AnyAction)
        const subscriptions = getState().entities.loyalty.subscribedLoyalties
        
        
        expect(subscriptions).toContainEqual(subscribeLoyalty)
    })

    it("Should fail to suscribe to the loyalty card", async () => {
        mockAdapter.onPost("/customerloyalty").reply(400, {})
        await dispatch(createSubscription(subscribeLoyalty) as unknown as AnyAction)
        const subscriptions = getState().entities.loyalty.subscribedLoyalties
        expect(subscriptions.length).toBe(0)
    })

    it("Should load susbscribed loyalties of the user", async () => {
        const url = new RegExp("/customerloyalty/findclient/*")
        mockAdapter.onGet(url).reply(200, [subscribeLoyalty])
        await dispatch(loadSubscribedLoyalties() as unknown as AnyAction)
        const subscriptions = getState().entities.loyalty.subscribedLoyalties
        expect(subscriptions).toStrictEqual([subscribeLoyalty])
    })

    it("Should fail to load user's subscribed loyalties", async () => {
        const url = new RegExp("/customerloyalty/findclient/*")
        mockAdapter.onGet(url).reply(400, {})
        await dispatch(loadSubscribedLoyalties() as unknown as AnyAction)
        const subscriptions = getState().entities.loyalty.subscribedLoyalties
        expect(subscriptions.length).toBe(1)
    })

    it("Should load user's transactions on their loyalty cards", async () => {
        const url = new RegExp("/transactionloyalty/findclient/*")
        mockAdapter.onGet(url).reply(200, [subscribeLoyalty])
        await dispatch(loadLoyaltyTransactions() as unknown as AnyAction)
        const transactions = getState().entities.loyalty.loyaltyTransactions
        expect(transactions.length).toBe(1)
    })

    it("Should fail to load user's transactions", async () => {
        const url = new RegExp("/transactionloyalty/findclient/*")
        mockAdapter.onGet(url).reply(400, {})
        await dispatch(loadLoyaltyTransactions() as unknown as AnyAction)
        const transactions = getState().entities.loyalty.loyaltyTransactions
        expect(transactions.length).toBe(0)
    })
})