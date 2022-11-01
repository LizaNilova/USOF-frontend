import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from '../../../utils/axios'

const initialState = { 
    user: null,
    userID: localStorage.getItem('userId'),
    token: null,
    isLoading: false,
    status: null,
    me: null
}

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({login, password, passwordConfirmation, email}) => {
        try {
            const { data } = await axios.post('/auth/register', {
                login,
                password,
                passwordConfirmation,
                email,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({login, password}) => {
        try {
            let email = null
            if (login.includes('@')){
                email = login 
                login = null
            }
            const { data } = await axios.post('/auth/login', {
                login,
                password,
                email,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            // console.log(data)

            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getMe = createAsyncThunk('auth/getMe', async () => {
        try {
            const { data } = await axios.get('/auth/me')
            // console.log(data)
            localStorage.setItem('userId', data.user._id)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const passwordForgot = createAsyncThunk(
    "auth/passwordForgot",
    async ({ email }) => {
      try {
        const { data } = await axios.post("/auth/recover", {
          email,
        });
  
        // if (data.token) {
        //   window.localStorage.setItem("token", data.token);
        // }
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const verifyPassword = createAsyncThunk(
    "auth/verifyPassword",
    async ({ new_password, confirm_password, token }) => {
      try {
        const { data } = await axios.post(`/auth/recover/${token}`, {
          new_password,
          confirm_password,
        });
  
        // if (data.token) {
        //   window.localStorage.setItem("token", data.token);
        // }
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        //Registration
        [registerUser.pending]:(state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]:(state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
        },
        [registerUser.rejected]:(state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //Login
        [loginUser.pending]:(state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]:(state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]:(state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //Check authorization (Get ME)
        [getMe.pending]:(state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]:(state, action) => {
            state.isLoading = false
            state.status = null
            state.userID = localStorage.getItem('userId')
            state.me = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejected]:(state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        // Forgot password
    [passwordForgot.pending]: (state) => {
        state.isLoading = true;
        state.status = null;
      },
      [passwordForgot.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
        // state.token = action.payload.token;
      },
      [passwordForgot.rejectWithValue]: (state, action) => {
        state.status = action.payload.message;
        state.isLoading = false;
      },
      // Verify password
      [verifyPassword.pending]: (state) => {
        state.isLoading = true;
        state.status = null;
      },
      [verifyPassword.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
        // state.token = action.payload.token;
      },
      [verifyPassword.rejectWithValue]: (state, action) => {
        state.status = action.payload.message;
        state.isLoading = false;
      },
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export default authSlice.reducer