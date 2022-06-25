import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditPost from './pages/AddEditPost';
import SinglePost from './pages/SinglePost';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TagPosts from './pages/TagPosts';
import { io } from "socket.io-client"
import Categories from './components/Categories';
import Category from './pages/Category';
import Profile from './pages/Profile';

function App() {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user?.result?.name)
  }, [socket, user])

  return (
    <BrowserRouter>
      <div className="App">
        <Header socket={socket} />
        <ToastContainer />
        <Routes>
          <Route path='/' exact element={<Home socket={socket} />} />
          <Route path='/posts/search' element={<Home />} />
          <Route path='/posts/tag/:tag' element={<TagPosts />} />
          <Route path='posts/category/:category' element={<Category />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/addPost' element={<PrivateRoute> <AddEditPost /> </PrivateRoute>} />
          <Route path='/editPost/:id' element={<PrivateRoute> <AddEditPost /> </PrivateRoute>} />
          <Route path='/post/:id' element={<SinglePost />} />
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path='/profile/:id' element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
