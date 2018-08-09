import React, {Component} from 'react'
import {connect} from 'react-redux'

class AllFoods extends Component {
    componentDidMount() {
        this.props.fetchFood()
    }
    
    render() {
        const {foods} = this.props
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

export default connect(mapStateToProps)(AllFoods)