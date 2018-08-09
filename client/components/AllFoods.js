import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFoodsByMeal} from '../store'

class AllFoods extends Component {
    
    render() {
        const {foods} = this.props
        return(
            Object.keys(foods.byId).map(elem => {
                return(
                    <h1 key={elem} > {foods.byId[elem].name} </h1>
                )
            })
        )
    }
}

const mapStateToProps = (state) => {
    return {
        foods: getFoodsByMeal(state, this.props.meal.id)
    }
}

export default connect(mapStateToProps)(AllFoods)