import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
function signupForm(isSignup) {
  if (!isSignup) {
    return
  }


  return (
    <div>
      <div>
        <label htmlFor="userName">
          <small>Name</small>
        </label>
        <input name="userName" type="text"/>
      </div>
      <div>
        <label htmlFor="startingWeight">
          <small>Starting Weight</small>
        </label>
        <input name="startingWeight" type="number"/>
      </div>

      <div>
        <label htmlFor="weightGoal">
          <small>Weight Goal</small>
        </label>
        <input name="weightGoal" type="number"/>
      </div>

    </div>


  )

}

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  console.log(name)
  const isSignup = name === 'signup'

  console.log(props)
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>

        {signupForm(isSignup)}

        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text"/>
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password"/>
        </div>
        <div>


          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {

        const startingWeight = evt.target.startingWeight.value
        const weightGoal = evt.target.weightGoal.value
        const userName = evt.target.userName.value
        dispatch(auth(email, password, formName, startingWeight, weightGoal, userName))
      }
      else {
        dispatch(auth(email, password, formName))

      }

    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
