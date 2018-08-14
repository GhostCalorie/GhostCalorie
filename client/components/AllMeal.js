import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AllFoods } from '../components'

class AllMeal extends React.Component {
  render() {
    console.log('in the meal component', this.props)
    return (
      <div>
        {this.props.meal.map(individualMeal => (
          <div key={individualMeal.id} className="collection center-align">
            <div className="flow-text truncate">
              {individualMeal.type}: {individualMeal.calories} calories
            </div>
            <div className="col s12">
              <Link
                to={`meal/search/${individualMeal.id}`}
                className="waves-effect orange darken-2  waves-light btn"
              >
                Search For Food
                <i className="material-icons right">search</i>
              </Link>
            </div>
            <AllFoods mealId={individualMeal.id} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    meal: state.meal
  }
}

export default connect(mapStateToProps, null)(AllMeal)
