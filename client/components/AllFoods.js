import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFoodsByMeal} from '../store'

class AllFoods extends Component {
    
    componentDidMount() {
        this.props.getFoods(this.props.state, this.props.meal.id)
    }

    render() {

        const {foods} = this.props
        console.log('state', this.props.state)
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
        state,
        foods: state.foods
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFoods: (state, mealId) => {dispatch(getFoodsByMeal(state, mealId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFoods)