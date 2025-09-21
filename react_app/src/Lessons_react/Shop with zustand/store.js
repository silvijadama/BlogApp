import {create} from 'zustand'

const useStore = create((set) => ({
    products:[],
    singleProduct: null,
    cart: [],
    price:[],
    setProducts: (products) => set({ products }),
    setSingleProduct: (singleProduct) => set({singleProduct: singleProduct}),
    addToCart:(product) => set((state) =>({cart:[...state.cart, product]}))
}))

export {useStore}

