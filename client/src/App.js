import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditPost from './pages/AddEditPost';
import SinglePost from './pages/SinglePost';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TagPosts from './pages/TagPosts';
import Category from './pages/Category';
import Profile from './pages/Profile';

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' exact element={<Home />} />
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
