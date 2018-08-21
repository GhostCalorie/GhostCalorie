import React, {Component} from 'react'
import {connect} from 'react-redux'
import {VictoryChart, VictoryBar, VictoryTheme} from 'victory'
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
            >
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
    console.log('calstate', state)
    return {

    }
}

 const mapDispatchToProps = dispatch => {
     return {

     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(CalorieTracker)