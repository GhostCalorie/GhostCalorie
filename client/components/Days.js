import React, {Component} from 'react'
import { connect } from 'react-redux';
import {postDay} from '../store'

class Days extends Component {

    constructor() {
        super()
        this.state = {
            calories: '',
            description: ''
        }
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
        
    }

    handleSubmit = evt => {
        evt.preventDefault()
        this.props.postDay(evt)
    }

    render() {
        console.log('props',this.props)
        return (
            <form onSubmit={this.handleSubmit}>
                <label> input calories: </label>
                <input 
                    className="input-field"
                    placeholder="calories..."
                    name="calories"
                    value={this.state.calories}
                    onChange={this.handleChange}
                />
                <label> input description: </label>
                <input 
                    className="input-field"
                    placeholder="description..."
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <button type='submit'> SUBMIT: </button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        postDay: (evt) => {
            const calories = evt.target.calories.value
            const description = evt.target.description.value
            dispatch(postDay({calories, description}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Days)