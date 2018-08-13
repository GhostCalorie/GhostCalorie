import React, {Component} from 'react'
import { connect } from 'react-redux';
import {postDay, me} from '../store'

class Days extends Component {

    constructor() {
        super()
        this.state = {
            calories: '',
            description: ''
        }
    }

    componentDidMount() {
        this.props.getUser()
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
        
    }

    handleSubmit = evt => {
        evt.preventDefault()
        this.props.postDay(evt, this.props.user)
    }

    render() {
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
        user: state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postDay: (evt,userId) => {
            const calories = evt.target.calories.value
            const description = evt.target.description.value
            dispatch(postDay({calories, description, userId}))
        },
        getUser: () => {
            dispatch(me())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Days)