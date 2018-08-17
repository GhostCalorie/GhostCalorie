import React from 'react'
import { AddFormField } from '../components'
import { postFood } from '../store'
import { connect } from 'react-redux'

class AddFood extends React.Component {
    submit = addedFood => {
        
        const currentMealId = Number(window.location.pathname.split('/')[2])
        this.props.postFood(addedFood, currentMealId)
        this.props.history.push(`/`)
    }
    render() {
        console.log('propspoo', this.props)
        return <AddFormField {...this.props} onSubmit={this.submit} />
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    postFood: (food, mealId) => dispatch(postFood(food, mealId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFood)
