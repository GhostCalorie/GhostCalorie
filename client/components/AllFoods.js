import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFoodsByMeal} from '../store'

class AllFoods extends Component {

    render() {

        const {foods} = this.props
        console.log('state', foods)
        return(
            Object.keys(foods.byId).map(elem => {
                if(elem.id === this.props.meal.id)
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

export default connect(mapStateToProps, null)(AllFoods)