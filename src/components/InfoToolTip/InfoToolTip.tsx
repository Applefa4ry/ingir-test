import React from 'react'
import './InfoToolTip.css'

const InfoToolTip = ({hasMistake, isOpen, onClose}:{
  hasMistake: boolean 
  isOpen: boolean
  onClose: any
}) => {
  return (
    <div className={`popup ${isOpen?"popup_opened":""}`}> 
      <div className={`popup__container popup__sign-container`}>
        <h2 className="popup__title">{!hasMistake?"Всё прошло успешно!":"Что-то пошло не так!\nПопробуйте ещё раз."}</h2>
      </div>
      <button onClick={onClose} type="button" className="popup__close"></button>
    </div>
  )
}

export default InfoToolTip