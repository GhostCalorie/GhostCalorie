import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AllFoods, CalorieGraph} from '../components'


class AllMeal extends React.Component {
  
  render() {
    return (
      
      <div className="container">
        <div className="row">
          <div className="col s12 m6 push-m3 center-align">
            {this.props.meal.map(individualMeal => {
              if (individualMeal.dayId === this.props.myDay.id)
              return (
              <div key={individualMeal.id} className="collection center-align">
                <div className="flow-text truncate collection-item black-text">
                  {individualMeal.type}: {individualMeal.calories} calories
                  <Link
                    to={`meal/search/${individualMeal.id}`}
                    className="waves-effect orange darken-2 left waves-light btn"
                  >
                    Search Food
                    <i className="material-icons right">search</i>
                  </Link>
                </div>
                <AllFoods mealId={individualMeal.id}/>
              </div>
              )}
            )}
          </div>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    meal: state.meals,
    user: state.user
  }

}

export default connect(mapStateToProps, null)(AllMeal)
