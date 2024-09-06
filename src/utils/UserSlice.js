
import { createSlice } from "@reduxjs/toolkit";
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const UserSlice = createSlice({
    name: 'User',
        initialState: {
            loginStatus: false,
             usernames: [], 
             passwords: [],
              signUpMsg: '', 
              logInMsg: '', 
            userIds: [],
        currentUserId: null},
    reducers: {
        
        signUpUser: (state, action) => {
                if(state.usernames.includes(action.payload.username)){
                    state.signUpMsg = "Sorry! The user already exists with this username"
                }
                else{
                    const userId = generateUniqueId();
                    state.usernames.push(action.payload.username);
                    state.passwords.push(action.payload.password);
                    state.userIds.push(userId);
                    state.signUpMsg = "You have successfully signed up."
                    state.loginStatus = true;
                    state.currentUserId = userId;
                }
        },

        loginUser: (state, action) => {
            const index = state.usernames.indexOf(action.payload.username);
            if(index !== -1 && state.passwords[index] === action.payload.password){
                state.logInMsg = "You have successfully logged in.";
                state.loginStatus = true;
                state.currentUserId = state.userIds[index];
            } else {
                state.logInMsg = "Sorry! Could not log in.";
            }
        },

        logoutUser: (state) => {
            state.currentUserId = null;
            state.loginStatus = false;
            state.logInMsg = '';
            state.signUpMsg = '';
        }
    }
})

export default UserSlice.reducer;
export const {signUpUser, loginUser, logoutUser} = UserSlice.actions;


