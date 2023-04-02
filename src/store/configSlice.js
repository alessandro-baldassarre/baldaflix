import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    apiConfig: {
        images: {},
        change_keys: []
    },
    genres: {}
}

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        getApiConfiguration: (state, action) => {
            state.apiConfig = action.payload
        },
        getGenres: (state, action) => {
            state.genres = action.payload
        }
    }
})

export const { getApiConfiguration, getGenres } = configSlice.actions

export const selectImagesConfig = (state) => state.config.apiConfig.images
export default configSlice.reducer
