import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const navigateToLogin = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="header-container">
      <div className="header-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button
          type="button"
          className="logout-button"
          onClick={navigateToLogin}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
