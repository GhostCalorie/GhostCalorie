import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {postFood} from '../store'

class AllFoods extends Component {
  submit = addedFood => {
    const currentMealId = Number(window.location.pathname.split('/')[3])
    addedFood.mealId = currentMealId
    this.props.postFood(addedFood)
  }

  render() {
    if (!this.props.mealItems) {
      return null
    }
    const {foods, mealItems} = this.props

    if (!Object.keys(foods.byId).length) {
      return null
    }

    if (!this.props.dbfoods) {
      return Object.values(mealItems.byId).map(elem => {
        if (elem.mealId === this.props.mealId) {
          return (
            <Link
              to={`/food/${elem.foodId}/edit`}
              className="collection-item black-text"
              key={elem.foodId}
            >
              <div> {foods.byId[elem.foodId.toString()].item_name} </div>
            </Link>
          )
        }
      })
    } else {
        console.log('db props', this.props)

      return this.props.dbfoods.hits.map(individualHits => {
        return (
          <div key = {individualHits._id}>
            {individualHits.fields.item_name} 
            <button className="waves-effect green waves-light btn" onClick = {() => {this.submit(individualHits.fields)}}>
                Add Food
            </button>
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
    mealItems: state.mealItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFood: newFood => dispatch(postFood(newFood))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFoods)
