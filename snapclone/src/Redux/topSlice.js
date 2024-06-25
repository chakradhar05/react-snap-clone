import {createSlice,createSelector} from '@reduxjs/toolkit'

export const topSlice = createSlice({
    name : 'top',
    initialState:{
        chatImage:null,
        selectedUser : null
    },
    reducers : {
        login : (state,action) => {
            state.selectedUser = action.payload;
        },
        logout : (state) =>{
            state.selectedUser = null;
        },
        assignImage : (state,action)=>{
            state.chatImage = action.payload;
        },
        refreshImage : (state)=>{
            state.chatImage = null

        }
    }
})


export const {login,logout,assignImage,refreshImage} = topSlice.actions;
export const selectselectedUser = (state) => state.top.selectedUser;
export const selectchatImage = (state) => state.top.chatImage;
export default topSlice.reducer;