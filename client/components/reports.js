import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, fetchDay} from '../store'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import CalorieGraph from './calorieGraph'
import MacroGraph from './macroGraph'


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
    for (let i = dayAmt ; i >= 0; i--) {
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



  render() {


    return (
      <div>

        <MacroGraph daysToGraph={this.getDaysInRange(5)}/>
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
