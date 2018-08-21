import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {postFood, putMealItem, delMealItem} from '../store'

class AllFoods extends Component {
  //   submit = (addedFood, currentMealId) => {
  //     addedFood.mealId = currentMealId
  //     console.log('added food with meal id', addedFood)
  //     console.log('current meal id', currentMealId)

  //     this.props.postFood(addedFood, currentMealId)
  //   }
  handleSubmit = mealItem => {
    event.preventDefault()
    mealItem.quantity = mealItem.quantity - 1
    if(mealItem.quantity > 0) {
        this.props.putMealItem(mealItem)
    } else {
        this.props.delMealItem(mealItem.id)
    }
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
            <div key={elem.foodId}>
              <Link to={`/food/${elem.foodId}/edit`} className="black-text">
                <div> {foods.byId[elem.foodId.toString()].item_name}</div>
                <div>Quantity: {elem.quantity}</div>
                <div>{foods.byId[elem.foodId.toString()].nf_calories} Calories </div>
              </Link>
              <button
                className="waves-effect waves-light btn teal lighten-1"
                type="button"
                value={elem.foodId}
                onClick={() => {
                  this.handleSubmit(elem)
                }}
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
      console.log('PROPS OF db food', this.props)
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
    putMealItem: mealItem => dispatch(putMealItem(mealItem)),
    delMealItem: mealId => dispatch(delMealItem(mealId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFoods)
