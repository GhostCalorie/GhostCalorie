
import React, { Component } from 'react'
import { connect } from 'react-redux'

class AllFoods extends Component {

    render() {
        if (!this.props.mealItems) {
            return null
        }
        const { foods, mealItems } = this.props

        if (!Object.keys(foods.byId).length) {
            return null
        }

        if (!this.props.dbfoods) {
            return (
                Object.values(mealItems.byId).map(elem => {
                    if (elem.mealId === this.props.mealId) {
                        return (
                            <div key={elem.id} > {foods.byId[(elem.foodId).toString()].name} </div>
                        )
                    }
                })

            )
        } else {
            console.log('in the dbfood component')

            return (

                this.props.dbfoods.hits.map(hits => {
                    return (
                        <div key={hits._id}> {hits.fields.item_name} </div>
                    )
                })
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        foods: state.foods,
        mealItems: state.mealItem,

    }
}

export default connect(mapStateToProps, null)(AllFoods)


