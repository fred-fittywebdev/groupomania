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

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/addPost' element={<AddEditPost />} />
          <Route path='/editPost/:id' element={<AddEditPost />} />
          <Route path='/post/:id' element={<SinglePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
