import {Layout} from './components/Layout'
import {Routes, Route} from 'react-router-dom'

import {PostsPage} from './pages/PostsPage'
import {PostPage} from './pages/PostPage'
import {AddPostPage} from './pages/AddPostPage'
import {RegisterPage} from './pages/RegisterPage.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {EditPostPage} from './pages/EditPostPage.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'
import { CategoriesPage } from './pages/CategoriesPage'
import { MyPostsPage } from './pages/MyPostsPage'
import { UserPage } from './pages/UserPage'
import { CategoryPostsPage } from './pages/CategoryPostsPage'
import { UsersPage } from './pages/UsersPage'
import { EditUserPage } from './pages/EditUserPage'
import { CreateUserPage } from './pages/CreateUserPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { VerificationPage } from './pages/VerificationPage'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  })
  return (
    <Layout>
      <Routes>
        <Route path='' element={<PostsPage/>}/>
        <Route path='my_posts' element={<MyPostsPage/>}/>
        <Route path=':id' element={<PostPage/>}/>
        <Route path='new' element={<AddPostPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path=':id/edit' element={<EditPostPage/>}/>
        <Route path='categories' element={<CategoriesPage/>}/>
        <Route path='categories/:id_category' element={<CategoryPostsPage/>}/>
        <Route path='users' element={<UsersPage/>}/>
        <Route path='users/:id_user' element={<UserPage/>}/>
        <Route path='users/:id_user/edit' element={<EditUserPage/>}/>
        <Route path='users/create' element={<CreateUserPage/>}/>
        <Route path='auth/resetPassword' element={<ResetPasswordPage/>}/>
        <Route path='recover/:token' element={<VerificationPage/>}/>
      </Routes>
      <ToastContainer position='bottom-right'/>
    </Layout>
  )
}

export default App;
