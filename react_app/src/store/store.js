import {create} from 'zustand'

const useStore = create((set) => ({
    products:[],
    singleProduct: null,
    cart: [],
    price:[],
    reserved: [],
    availableMoney: 200,
    reservedMoney: 0,
    selectedMood:"fun",

    setAvailableMoney: (amount) => set({ availableMoney: amount }),
    setReservedMoney: (amount) => set ({reservedMoney: amount}),

    setReservedItems: (items) => set({reserved: items}),
    setProducts: (products) => set({ products }),
    setSingleProduct: (singleProduct) => set({singleProduct: singleProduct}),
    addToCart:(product) => set((state) =>({cart:[...state.cart, product]})),
    setMood:(selectedMood) => set({selectedMood: selectedMood})

    // apples: 4,,
    // bananas: 3,
    // oranges: 2,
    // data: [],
    // increasePopulation: () => set((state) => ({bears: state.bears + 1})),
    // removeAllBears: () => set({bears: 0}),
    // updateBears: (newBears) => set({bears: newBears}),
    // increaseApples: () => set((state) => ({apples: state.apples + 1})),
    // increaseBananas: () => set((state) => ({bananas: state.bananas + 1})),
    // increaseOranges: () => set((state) => ({oranges: state.oranges + 1})),
    // setAppleValue: (value) => set({apples: value}),
    // setBananaValue: (value) => set({bananas: value}),
    // setOrangesValue: (value) => set({oranges: value}),
    // addData:(newData) => set((state) => ({data: [...state.data, newData]}))
}))

export {useStore}
