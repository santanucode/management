import React from 'react'
import errorimg from 'assets/images/errorimg.png'
import './pagenotfound.scss'
import { useNavigate } from 'react-router-dom'
const Pagenotfound = () => {
  const navigate = useNavigate()
  const LogoutPass = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <>
      <div className="errorimg">
        <img src={errorimg} />

        <div className="errorbacktologin">
          <h4 onClick={LogoutPass}>Back to login</h4>
        </div>
      </div>
    </>
  )
}
export default Pagenotfound
