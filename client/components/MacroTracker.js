import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryGroup } from 'victory'
import { me, fetchDay, newDay } from '../store'

class MacroTracker extends Component {

    render() {
        console.log('props', this.props)
        if (!this.props.meals) {
            return (
                <h1>Macro Nutrients</h1>
            )
        } else {

            return (
                <div style={{ fontSize: 2 }}>

                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={400}
                        height={400}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    >
                        <VictoryGroup offset={10} style={{ data: { width: 8 } }}>
                            <VictoryLabel text='Grams' />
                            <VictoryBar
                                style={{ data: { fill: "#c43a31" } }}
                                alignment="start"
                                data={this.props.meals}
                                x='type'
                                y='protein'
                            />
                          
                            <VictoryBar
                                style={{ data: { fill: "blue" } }}
                                alignment="start"
                                data={this.props.meals}
                                x='type'
                                y='carbs'
                            />
                         
                            <VictoryBar
                                style={{ data: { fill: "yellow" } }}
                                alignment="start"
                                data={this.props.meals}
                                x='type'
                                y='fat'
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </div>
            )
        }
    }
}

export default connect(null)(MacroTracker)
