import React, {Component} from 'react'
import {connect} from 'react-redux'
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel} from 'victory'
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
            width={400}
            height={400}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            >
                <VictoryLabel  text='Calories' />
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

    }
}

 const mapDispatchToProps = dispatch => {
     return {

     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(CalorieTracker)

 
