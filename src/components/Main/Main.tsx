import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

const Main = ({handleLogOut}:{
  handleLogOut: any
}) => {
  const navigation = useNavigate();

  return (
    <main className='nav'>
      <nav className='nav__links'>
        <button className='nav__link' onClick={() => navigation('/orders')}>Заказы</button>
        <button className='nav__link' onClick={handleLogOut}>Выйти</button>
      </nav>
    </main>
  )
}

export default Main