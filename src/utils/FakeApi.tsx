import { token } from "../constants/token"
import { admin } from "../constants/admin"
import { data } from "../constants/data"
import { Order } from "../types/Order"

const checkToken = (jwt:string) => {
  return new Promise(function(resolve,reject){
    if(jwt === token){
      resolve(admin);
    } else {
      reject('Произошла ошибка входа');
    }
  })
}

const authorize = (username: string, password: string) => {
  return new Promise(function(resolve,reject){
    if(username === admin.username && password === admin.password){
      resolve(admin);
    } else {
      reject('Произошла ошибка входа');
    }
  })
  .then(data => {
    localStorage.setItem('jwt', token);
    return data;
  })
}

const getOrders = () => {
  return new Promise(function(resolve, reject){
    if(true){
      resolve(data)
    } else {
      reject('Произошла ошибка')
    }
  })
}

export { checkToken, authorize, getOrders };