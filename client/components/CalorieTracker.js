import React, {Component} from 'react'
import {connect} from 'react-redux'
import {VictoryChart, VictoryBar, VictoryTheme} from 'victory'
import { me, fetchDay, newDay} from '../store'

class CalorieTracker extends Component {

    componentDidUpdate() {
        this.props.fetchDay()
    }

    render() {
        return (
            <VictoryChart
            theme={VictoryTheme.material}
            >
                <VictoryBar
                    style={{ data: { fill: "#c43a31" } }}
                    alignment="start"
                    data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 6 }
                      ]}
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