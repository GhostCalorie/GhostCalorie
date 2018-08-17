import React, {Component} from 'react'
import { connect } from 'react-redux';
import { me, fetchDay, newDay} from '../store'
import {Input} from 'react-materialize'
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import moment from 'moment'
import {AllMeal} from './index'

class Days extends Component {
  constructor() {
    super()
    this.state = {
      selectedDay: undefined,
      myDay: {},
    }
  }

    defaultToday = () => {
        const today = moment().format('YYYY[-]MM[-]DD')

        if (Object.keys(this.state.myDay).length === 0){
            for (let i=0; i < this.props.day.days.length; i++){
                if (today === this.props.day.days[i].createdAtString){
                    this.setState({myDay: this.props.day.days[i]})
                }
            }
          }
    }
    handleDayClick = (day) => {
        const myDay = moment(day.target.value,'DD MMMM YYYY').format('YYYY[-]MM[-]DD')
        for (let i=0; i < this.props.day.days.length; i++){
            if(myDay === this.props.day.days[i].createdAtString){
                this.setState({myDay: this.props.day.days[i]})
                this.props.newDay(this.props.day.days[i])
            }
        }

        this.setState({selectedDay: myDay})

    }


  componentDidMount() {
    this.props.getUser()
    this.props.fetchDay(this.props.user)

    if (Object.keys(this.props.myDay).length > 1) {
        this.setState({myDay: this.props.myDay})
    }

  }

  componentDidUpdate() {
    this.defaultToday()
    render()
    {


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
        </div>
      )
    }

  }



const mapStateToProps = state => {
  return {
    user: state.user.id,
    day: state.days,
    myDay: state.days.myDay
  }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => {
            dispatch(me())
        },
        fetchDay: (id) => {
            dispatch(fetchDay(id))
        },
        newDay: (day) => {
            dispatch(newDay(day))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Days)
