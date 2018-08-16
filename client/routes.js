import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Search,
  AllFoods,
  AllMeal,
  EditFood,
  AddFood,
  CalorieTracker,
  Days
} from './components'
import {me, fetchFood, getMeals, getMealItems, fetchDBFood} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {





  componentDidMount() {
    this.props.loadInitialData()
  }





  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are only available after logging in */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
      <Switch>
         {/* Routes placed here are only available after logging in */}
         {/* Displays our Login component as a fallback */}
        <Route exact path="/" component={AllMeal} />
        <Route path="/meal/search/:mealId" component={Search} />
        <Route path="/calorie" component={CalorieTracker} />
        <Route path="/days" component={Days} />
         {/* Displays our Login component as a fallback */}
        <Route path="/food/:mealId/:foodId/add" component={AddFood} />
        <Route path="/food/:foodId/edit" component={EditFood} />
      </Switch>
        )}
         {/* Displays our Login component as a fallback */}
         {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      await dispatch(me())
      await dispatch(getMeals())
      await dispatch(fetchFood())
      await dispatch(fetchDBFood())
      await dispatch(getMealItems())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
