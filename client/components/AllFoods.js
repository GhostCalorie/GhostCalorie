import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFood} from '../store'

class AllFoods extends Component {
    componentDidMount() {
        this.props.fetchFood()
    }
    
    render() {
        const {foods} = this.props
        console.log('food', foods)
        return(
            Object.keys(foods.byId).map(elem => {
                return(
                    <h1 key={elem} > {foods.byId[elem].name} </h1>
                )
            })
        )
    }
}

const mapStateToProps = (state) => {
    return {
        foods: state.foods
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFood: () => {
            dispatch(fetchFood())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllFoods)