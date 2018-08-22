import React from 'react'
import { AddFormField } from '../components'
import { postFood , getMeals} from '../store'
import { connect } from 'react-redux'

class AddFood extends React.Component {
    submit = async addedFood => {
        
        const currentMealId = Number(window.location.pathname.split('/')[2])
        await this.props.postFood(addedFood, currentMealId)
        console.log('leaving...')
        this.props.history.push(`/`)
    }
    render() {
        return <AddFormField {...this.props} onSubmit={this.submit} />
    }
}

const mapDispatchToProps = dispatch => ({
    postFood: async (food, mealId) => { 
        console.log('in first!!')
        await dispatch( postFood(food, mealId))
        console.log('woopee')
        await dispatch( getMeals())
    }
})

export default connect(null, mapDispatchToProps)(AddFood)
