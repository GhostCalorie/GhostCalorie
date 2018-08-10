import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDBFood} from '../store'
// import axios from 'axios'

class AllFoods extends Component {
    constructor() {
        super();
        this.state = {
            food: ''
        }
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    
    render() {
        const {foods} = this.props
        return(
            <div>
            {Object.values(foods.byId).map(elem => {
                return(
                    <h1 key={elem.id} > {elem.name} </h1>
                )
            })}

            <form onSubmit={(evt) => {
                evt.preventDefault()
                this.props.fetchDBFood(this.state.food)
            }}>
                <label>food input</label>
                <input name='food' value={this.state.food} onChange={this.handleChange} />
                <button type='submit'> SUBMIT </button>
            </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        foods: state.foods,
        dbfoods: state.dbfoods
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDBFood: (query) => {
            console.log('query in allfoods component', query)
            dispatch(fetchDBFood(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFoods)