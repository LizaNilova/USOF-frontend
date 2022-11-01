import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'


const initialState = {
    posts: [],
    myPosts: [],
    like: null,
    likes: [],
    dislikes: [],
    postCategories: [],
    loading: false,
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
    try {
        const { data } = await axios.post('/posts', params)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostById = createAsyncThunk('post/getPostById', async (params) => {
    try {
        const { data } = await axios.get(`/posts/${params.id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getMyPosts = createAsyncThunk('post/getMyPosts', async () => {
    try {
        const { data } = await axios.get(`posts/user/my_posts`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostsByUserId = createAsyncThunk('post/getPostsByUserId', async (userId) => {
    try {
        const { data } = await axios.get(`/posts/users/${userId}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const { data } = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostCategories = createAsyncThunk('post/getPostCategories',
    async (postID) => {
        try {
            const { data } = await axios.get(`posts/${postID}/categories`)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const { data } = await axios.delete(`posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async (req) => {
    try {
        // for(var pair of req.entries()){
        //     console.log("hello", pair[0]+', '+pair[1])
        // }

        const { data } = await axios.patch(`/posts/${req.get('id')}`, req)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostLikes = createAsyncThunk('post/getPostLikes',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/${postId}/likes`)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const getPostDislikes = createAsyncThunk('post/getPostDislikes',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/${postId}/dislikes`)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const createLikeUnderPost = createAsyncThunk('post/createLikeUnderPost',
    async (type, postId) => {
        try {
            const { data } = await axios.post(`/posts/${postId}/like`, type)
            console.log(data)
            return { data }
        } catch (error) {
            console.log(error)
        }
    })

export const getLike = createAsyncThunk('post/getLike',
    async (postID) => {
        try {
            const { data } = await axios.get(`/posts/${postID}/like`)
            return data
        } catch (error) {
            console.log(error)
        }
    })


export const getPostsWithFilters = createAsyncThunk('post/getPostsWithFilters',
    async (categories) => {
        try {
            let filters
            if (categories.length > 0) {
                filters = '/filters/'
                for(let i = 0; i < categories.length ; i++){
                    filters += categories[i]
                    if (i <categories.length - 1){
                        filters += '+'
                    }
                }
            } else {
                filters = ''
            }

            const { data } = await axios.get(`/posts${filters}`)
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        // Create post
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.loading = false
        },

        // Get all posts
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },

        // Get all posts
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },

        //Get post`s all categories
        [getPostCategories.pending]: (state) => {
            state.isLoading = true
        },
        [getPostCategories.fulfilled]: (state, action) => {
            state.isLoading = false
            state.postCategories = action.payload?.categories
        },
        [getPostCategories.rejected]: (state) => {
            state.isLoading = false
        },

        // Get post by id
        [getPostById.pending]: (state) => {
            state.loading = true
        },
        [getPostById.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload?.post
        },
        [getPostById.rejected]: (state) => {
            state.loading = false
        },

        // Get all curent user`s posts
        [getMyPosts.pending]: (state) => {
            state.loading = true
        },
        [getMyPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.myPosts = action.payload.posts
        },
        [getMyPosts.rejected]: (state) => {
            state.loading = false
        },

        // Get all user`s posts
        [getPostsByUserId.pending]: (state) => {
            state.loading = true
        },
        [getPostsByUserId.fulfilled]: (state, action) => {
            state.loading = false
            state.myPosts = action.payload?.posts
        },
        [getPostsByUserId.rejected]: (state) => {
            state.loading = false
        },

        // Remove post
        [removePost.pending]: (state) => {
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter((post) => post._id !== action.payload._id)
        },
        [removePost.rejected]: (state) => {
            state.loading = false
        },

        // Update post data
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex((post) => post._id === action.payload._id)
            state.posts[index] = action.payload
            const index1 = state.myPosts.findIndex((post) => post._id === action.payload._id)
            state.myPosts[index1] = action.payload
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },

        // getPostLikes 
        [getPostLikes.pending]: (state) => {
            state.loading = true
        },
        [getPostLikes.fulfilled]: (state, action) => {
            state.loading = false
            state.likes = action.payload
        },
        [getPostLikes.rejected]: (state) => {
            state.loading = false
        },

        // getPostDislikes 
        [getPostDislikes.pending]: (state) => {
            state.loading = true
        },
        [getPostDislikes.fulfilled]: (state, action) => {
            state.loading = false
            state.dislikes = action.payload
        },
        [getPostDislikes.rejected]: (state) => {
            state.loading = false
        },

        // Get like 
        [getLike.pending]: (state) => {
            state.loading = true
        },
        [getLike.fulfilled]: (state, action) => {
            state.loading = false
            state.like = action.payload?.data
        },
        [getLike.rejected]: (state) => {
            state.loading = false
        },

        // Get filtered posts
        [getPostsWithFilters.pending]: (state) => {
            state.loading = true
        },
        [getPostsWithFilters.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
        },
        [getPostsWithFilters.rejected]: (state) => {
            state.loading = false
        },

    },
})

export default postSlice.reducer