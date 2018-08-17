import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postFood, delFood } from '../store'

class AllFoods extends Component {
    //   submit = (addedFood, currentMealId) => {
    //     addedFood.mealId = currentMealId
    //     console.log('added food with meal id', addedFood)
    //     console.log('current meal id', currentMealId)

    //     this.props.postFood(addedFood, currentMealId)
    //   }
    handleSubmit = () => {
        event.preventDefault()
        const foodId = event.target.value
        this.props.delFood(foodId)
    }

    render() {
        if (!this.props.mealItems) {
            return null
        }
        const { foods, mealItems } = this.props

        if (!Object.keys(foods.byId).length) {
            return null
        }

        if (!this.props.dbfoods) {
            return Object.values(mealItems.byId).map(elem => {
                if (elem.mealId === this.props.mealId) {
                    return (
                        <div key={elem.foodId}
                        >
                            <Link
                                to={`/food/${elem.foodId}/edit`}
                            >
                                <div> {foods.byId[elem.foodId.toString()].item_name}
                                </div>
                            </Link>
                            <button
                                className="waves-effect waves-light btn teal lighten-1"
                                type="button"
                                value={elem.foodId}
                                onClick={this.handleSubmit}
                            >
                                Delete
                    </button>
                        </div>
                    )
                }
            })
        } else {
            const currentMealId = Number(window.location.pathname.split('/')[3])
            let hitCount = -1
            return this.props.dbfoods.hits.map(individualHits => {
                hitCount++
                return (
                    <div key={individualHits._id} className="collection center-align">
                        <Link
                            to={`/food/${currentMealId}/${hitCount}/add`}
                            className="collection-item black-text"
                        >
                            {individualHits.fields.item_name}
                        </Link>
                        {/* <button className="waves-effect green waves-light btn" onClick = {() => {this.submit(individualHits.fields, currentMealId)}}>
                Add Food
            </button> */}
                    </div>
                )
            })

        }
    }
}

const mapStateToProps = state => {

    return {
        state,
        foods: state.foods,
        mealItems: state.mealItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postFood: (newFood, mealId) => dispatch(postFood(newFood, mealId)),
        deleteFood: (foodId) => dispatch(deleteFood(foodId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFoods)
