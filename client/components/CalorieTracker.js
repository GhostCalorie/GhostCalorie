import React, {Component} from 'react'
import {connect} from 'react-redux'
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryLine} from 'victory'
import { me, fetchDay, newDay} from '../store'

class CalorieTracker extends Component {

    render() {
        if(!this.props.meals){
            return(
                <h1>Select a Day!</h1>
            )
        }
        return (
            <VictoryChart
            theme={VictoryTheme.material}
            width={300}
            height={300}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            >
                <VictoryLabel  text='Calories' x={130} y={40}/>
                <VictoryLabel text='You' x={80} y={150} />
                <VictoryLine data={[{x:0,y:20000}, {x:200, y:20000} ]}/>
                
                <VictoryBar
                    style={{ data: { fill: "#c43a31" } }}
                    alignment="start"
                    data={this.props.meals}
                    x='type'
                    y='calories' 
                />
            </VictoryChart>
        )
    }
}

const mapStateToProps = state => {
    return {
        myDay: state.days.myDay,
        day: state.days
    }
}

 const mapDispatchToProps = dispatch => {
     return {
     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(CalorieTracker)

 
