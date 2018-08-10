import React, { Component } from 'react'
import { connect } from 'react-redux'

class AllFoods extends Component {

    render() {
        console.log('state', this.props)
        if (!this.props.mealItems) {
            return null
        }
        const { foods, mealItems } = this.props

        if(!Object.keys(foods.byId).length) {
            return null
        }

        return (
            Object.values(mealItems.byId).map(elem => {
                console.log('elem', elem)
                console.log('props mealId', this.props.mealId)

                if (elem.mealId === this.props.mealId) {
                    return (

                        <h1 key={elem.id} > {foods.byId[(elem.foodId).toString()].name} </h1>
                    )
                }
            })
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        foods: state.foods,
        mealItems: state.mealItem
    }
}

export default connect(mapStateToProps, null)(AllFoods)