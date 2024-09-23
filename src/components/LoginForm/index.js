import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state
    return (
      <>
        <label htmlFor="userId" className="label">
          User ID
        </label>
        <br />
        <input
          id="userId"
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={this.onChangeUserId}
          className="input-element"
        />
        <br />
      </>
    )
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  renderUserPin = () => {
    const {pin} = this.state
    return (
      <>
        <label htmlFor="userPin" className="label">
          PIN
        </label>
        <br />
        <input
          id="userPin"
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={this.onChangePin}
          className="input-element"
        />
        <br />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <div className="login-form-responsive-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-image"
            />
          </div>
          <div className="user-input-form-container">
            <h1 className="form-heading">Welcome Back!</h1>
            <form onSubmit={this.onSubmitForm}>
              {this.renderUserId()}
              {this.renderUserPin()}
              <button type="submit" className="login-button">
                Login
              </button>
              {errorMsg && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
