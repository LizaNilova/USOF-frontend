import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    categories: [],
    category: null,
    postsWithCurCategory: [],
    loading: false,
    status: null
}

export const getAllCategories = createAsyncThunk('category/getAllCategories', async () => {
    try {
        const { data } = await axios.get('/categories')
        return data
    } catch (error) {
        console.log(error)
    }
},
)

export const getCategoryById = createAsyncThunk('category/getCategoryById',
    async (categoryId) => {
        try {
            const { data } = await axios.get(`/categories/${categoryId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const getAllPostsWithCurCategory = createAsyncThunk('category/getAllPostsWithCurCategory',
    async (categoryId) => {
        try {
            const { data } = await axios.get(`/categories/${categoryId}/posts`)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const createNewCategory = createAsyncThunk('category/createNewCategory', async (req) => {
    try {
        const { data } = await axios.post('/categories', req)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        //Get all categories
        [getAllCategories.pending]: (state) => {
            state.isLoading = true
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.isLoading = false
            state.categories = action.payload?.categories
        },
        [getAllCategories.rejected]: (state) => {
            state.isLoading = false
        },

        //Get category by ID
        [getCategoryById.pending]: (state) => {
            state.isLoading = true
        },
        [getCategoryById.fulfilled]: (state, action) => {
            state.isLoading = false
            state.category = action.payload?.category
        },
        [getCategoryById.rejected]: (state) => {
            state.isLoading = false
        },

        //Get posts with category
        [getAllPostsWithCurCategory.pending]: (state) => {
            state.isLoading = true
        },
        [getAllPostsWithCurCategory.fulfilled]: (state, action) => {
            state.isLoading = false
            state.postsWithCurCategory = action.payload
        },
        [getAllPostsWithCurCategory.rejected]: (state) => {
            state.isLoading = false
        },

        // Create category
        [createNewCategory.pending] : (state) => {
            state.loading = true
            state.status = null
        },
        [createNewCategory.fulfilled] : (state, action) => {
            state.loading = false
            if(action.payload.category){
                state.categories.push(action.payload.category)
            } else {
                state.status = action.payload.message
            }
        },
        [createNewCategory.rejected] : (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    },
})

export default categorySlice.reducer