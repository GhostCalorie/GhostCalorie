import React, {Component} from 'react'
import { connect } from 'react-redux';
import { me, fetchDay, newDay, getMeals} from '../store'
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import {Input} from 'react-materialize'
import moment from 'moment'
import {AllMeal, CalorieTracker, MacroTracker} from './index'

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



  async componentDidMount() {
    await this.props.getUser()
    await this.props.fetchDay(this.props.user)
    

    if (Object.keys(this.props.myDay).length > 1) {
      this.setState({myDay: this.props.myDay})
      this.props.newDay(this.props.myDay)
    }
    

  }

  componentDidUpdate(){
    this.defaultToday()
  }

  render() {
    const {meals} = this.props.myDay
    return (
      <div>
        <Input
          name='on'
          type='date'
          onChange={this.handleDayClick}
          value={this.state.selectedDay}
          placeholder={this.state.myDay.createdAtString}
          icon='view_headline'
        />
        <h2 align='center'>Meals</h2>
        <AllMeal myDay={this.state.myDay}/>
        <CalorieTracker meals={meals} />
        <MacroTracker meals={meals} />

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
    },
    getMeals: () => {
      dispatch(getMeals())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Days)



