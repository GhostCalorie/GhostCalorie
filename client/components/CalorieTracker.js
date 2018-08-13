import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    VictoryBar, 
    VictoryChart, 
    VictoryAxis,
    VictoryTheme
} from 'victory'

const data = [
    {day: 1, calories: 1000},
    {day: 2, calories: 1200},
    {day: 3, calories: 1500},
    {day: 4, calories: 1000}
]

class CalorieTrack extends Component {
    render() {
        return(
            <VictoryChart theme={VictoryTheme.material}domainPadding={20}>
            <VictoryAxis ticks={[1,2,3,4]} tickFormat={['Day 1','Day 2','Day 3','Day 4']}/>
            <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
            />
            <VictoryBar
            data = {data}
            x = 'day'
            y = 'calories'
            />
            </VictoryChart>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalorieTrack)


