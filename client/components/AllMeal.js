import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { AllFood } from '../components'

class AllMeal extends React.Component {
    render() {
        console.log('in the meal component', this.props)
        return (
            <div className="collection center-align">
                {this.props.meal.map(individualMeal => (
                    <div key = {individualMeal.id} className="`collection-item black-text">
                        {individualMeal.type}: {individualMeal.calories}
                        {/* <AllFood meal = {this.props.meal}/> */}
                    </div>
                ))}
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        meal: state.meal,
    }
}

export default connect(mapStateToProps, null)(AllMeal)

