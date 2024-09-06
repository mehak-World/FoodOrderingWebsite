import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { userCarts: {} }, // Store carts for each user
    reducers: {
        addToCart: (state, action) => {
            const { userId, item } = action.payload;
            if (!state.userCarts[userId]) {
                state.userCarts[userId] = { items: [], quantities: [] };
            }
            const userCart = state.userCarts[userId];
            const itemIndex = userCart.items.findIndex(i => i.card.info.id === item.card.info.id);
            if (itemIndex !== -1) {
                userCart.quantities[itemIndex] += 1;
            } else {
                userCart.items.push(item);
                userCart.quantities.push(1);
            }
        },
        removeFromCart: (state, action) => {
            const { userId, itemId } = action.payload;
            const userCart = state.userCarts[userId];
            if (userCart) {
                const itemIndex = userCart.items.findIndex(i => i.card.info.id === itemId);
                if (itemIndex !== -1) {
                    userCart.quantities[itemIndex] = 0;
                }
            }
        },
        clearCart: (state, action) => {
            const { userId } = action.payload;
            state.userCarts[userId] = { items: [], quantities: [] };
        },
        changeQuantity: (state, action) => {
            const { userId, id, newQuantity } = action.payload;
            const userCart = state.userCarts[userId];
            if (userCart) {
                const itemIndex = userCart.items.findIndex(i => i.card.info.id === id);
                if (itemIndex !== -1) {
                    userCart.quantities[itemIndex] = newQuantity;
                }
            }
        }
    }
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, changeQuantity } = cartSlice.actions;
