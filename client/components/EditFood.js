import React from 'react'
import {EditFormField} from '../components'
import {putFood} from '../store'
import {connect} from 'react-redux'

class EditFood extends React.Component {
  submit = editedFood => {
    this.props.putFood(editedFood)
    this.props.history.push(`/`)
  }
  render() {
    return <EditFormField {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => ({
    putFood: food => dispatch(putFood(food))
})

export default connect(null, mapDispatchToProps)(EditFood)
