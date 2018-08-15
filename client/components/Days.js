import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, fetchDay} from '../store'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import CalorieGraph from './calorieGraph'

class Days extends Component {
  constructor() {
    super()
    this.state = {
      selectedDay: undefined,
      myDay: {},
      graphDays: []
    }
  }


  getDaysInRange(dayAmt) {
    let datesToFilter = {}
    for (let i = dayAmt - 1; i >= 0; i--) {
      const mmt = moment().subtract(i, 'days').format('YYYY[-]MM[-]DD')
      datesToFilter[mmt] = true

    }
    return this.props.day.days.filter(day => datesToFilter.hasOwnProperty(day.createdAtString))
  }


  componentDidMount() {
    this.props.getUser()
    this.props.fetchDay(this.props.user)
  }

  // handleChange = evt => {
  //     this.setState({
  //         [evt.target.name]: evt.target.value
  //     })

  // }

  // handleSubmit = evt => {
  //     evt.preventDefault()
  // }

  handleDayClick = (day) => {
    for (let i = 0; i < this.props.day.days.length; i++) {
      if (day.getDate() == this.props.day.days[i].date) {
        this.setState({myDay: this.props.day.days[i]})
      }
    }

    this.setState({selectedDay: day})

  }

  render() {
    return (
      <div>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDay}
        />
        {this.state.selectedDay ? (
          <div>
            <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
            <h1> {this.state.myDay.createdAtString}</h1>
            <h1> {this.state.myDay.calories} </h1>
            <h1> {this.state.myDay.description}</h1>
          </div>
        ) : (
          <p>Please select a day.</p>
        )}
        <CalorieGraph daysToGraph={this.getDaysInRange(4)}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.id,
    day: state.days
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
