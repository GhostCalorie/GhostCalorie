import React, {Component} from 'react'
import { connect } from 'react-redux';
import {postDay, me, fetchDay} from '../store'

class Days extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         calories: '',
    //         description: ''
    //     }
    // }

    componentDidMount() {
        this.props.getUser()
        this.props.fetchDay(this.props.user)
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
        
    }

    handleSubmit = evt => {
        evt.preventDefault()
    }

    render() {
        return (
            <h1> DAY METRICS GO HERE </h1>
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
        // postDay: (evt,userId) => {
        //     const calories = evt.target.calories.value
        //     const description = evt.target.description.value
        //     dispatch(postDay({calories, description, userId}))
        // },
        getUser: () => {
            dispatch(me())
        },
        fetchDay: (id) => {
            dispatch(fetchDay(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Days)