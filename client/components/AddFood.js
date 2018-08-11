import React from 'react'
import {FoodForm} from '../components'
import {postFood} from '../store'
import {connect} from 'react-redux'

class AddFood extends React.Component {
  submit = addedFood => {
    this.props.postFood(addedFood)
    //this will redirect to the thunk id
  }

  render() {
    return <FoodForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postProduct: newFood => dispatch(postFood(newFood))
  }
}

export default connect(null, mapDispatchToProps)(AddFood)
