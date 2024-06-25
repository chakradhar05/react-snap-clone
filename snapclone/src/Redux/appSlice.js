import {createSlice,createSelector} from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name : 'app',
    initialState:{
        image:0,
    },
    reducers : {
        setMyImage : (state,action) => {
            state.image = action.payload;
        },
        resetMyImage : (state) =>{
            state.image = null;
        }
    }
})

export const {setMyImage,resetMyImage} = appSlice.actions;
export const selectImage = (state) => state.app.image
export default appSlice.reducer;