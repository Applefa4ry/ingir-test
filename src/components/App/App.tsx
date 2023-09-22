import React from 'react';
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { User } from '../../types/User';
import * as FakeApi from '../../utils/FakeApi'
import './App.css';
import Login from '../Login/Login';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import Main from '../Main/Main';
import Orders from '../Orders/Orders';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function App() {
  const [currentUser, setCurrentUser] = React.useState<User | {}>({});
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('jwt') ? true : false);
  const [hasMistake, setHasMistake] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    console.log(typeof jwt)
    if (typeof jwt !== 'string') {
      setLoggedIn(false);
      navigate('/signin');
      console.log('Я тут?!')
      return;
    }
    FakeApi.checkToken(jwt)
      .then((res) => {
        if (res){
          setCurrentUser(res)
          setLoggedIn(true);
        }
      })
      .catch(err => {
        setLoggedIn(false);
        navigate('/signin');
        console.log(err)
      });
  }

  const handleLogin = () => {
    handleTokenCheck();
    navigate('/', {replace: true});
    setLoggedIn(true);
  }

  const handleLogOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    navigate('/signin');
  }

  const closePopup = () => {
    setIsOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <InfoToolTip hasMistake={hasMistake} isOpen={isOpen} onClose={closePopup} />
        <Routes>
          <Route path='/' element={<ProtectedRouteElement loggedIn={loggedIn} element={<Main handleLogOut={handleLogOut} />} />} />
          <Route path='/orders' element={<ProtectedRouteElement loggedIn={loggedIn} element={<Orders />} />} />
          <Route path='/signin' element={loggedIn ? <Navigate to='/' /> :<Login setIsOpen={setIsOpen} setHasMistake={setHasMistake} handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
