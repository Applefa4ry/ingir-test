import React from 'react'
import * as FakeApi from '../../utils/FakeApi'
import './Login.css'

const Login = ({handleLogin, setIsOpen, setHasMistake}:{
  handleLogin: any
  setIsOpen: any
  setHasMistake: any
}) => {

  const [formValue, setFormValue] = React.useState({
    username: '',
    password: ''
  });

  const handleChange = (e: any) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    FakeApi.authorize(formValue.username, formValue.password)
      .then(res => {
        if(res){
          handleLogin();
          setHasMistake(false);
          setFormValue({username:"", password:""})
        }
      })
      .catch(err => {
        setHasMistake(true);
      })
      .finally(() => {
        setIsOpen(true)
      })
  }
  
  return (
    <main className='login'>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="username" className='form__label'>Логин</label>
        <input 
          id='username' 
          name='username'
          onChange={handleChange}
          minLength={5} 
          maxLength={200} 
          required 
          placeholder='Логин' 
          type='text' 
        />
        <label htmlFor="password" className='form__label'>Пароль</label>
        <input
          id='password'
          name='password'
          onChange={handleChange}
          minLength={8} 
          maxLength={200} 
          required 
          placeholder='Пароль' 
          type='password'
        />
        <button type='submit' className='form__button'>Войти</button>
      </form>
    </main>
  )
}

export default Login