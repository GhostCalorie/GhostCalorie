import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryGroup } from 'victory'
import { me, fetchDay, newDay } from '../store'

class MacroTracker extends Component {

    render() {
        console.log('props', this.props)
        if (!this.props.meals) {
            return (
                <h1> </h1>
            )
        } else {

            return (
                <div style={{ fontSize: 2 }}>

                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={300}
                        height={300}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    >
                        <VictoryGroup offset={10} y0={0} style={{ data: { width: 8 } }}>
                            <VictoryLabel text='Grams' y={30}/>
                            <VictoryBar
                                style={{ data: { fill: "#c43a31" } }}
                                alignment="start"
                                data={this.props.meals}
                                x='type'
                                y='protein'
                                labels={(d) => 'protein'}
                                labelComponent={<VictoryLabel dy={-30}/>}
                            />
                          
                            <VictoryBar
                                style={{ data: { fill: "blue" } }}
                                alignment="start"
                                data={this.props.meals}
                                x='type'
                                y='carbs'
                                labels={(d) => 'carbs'}
                                labelComponent={<VictoryLabel dy={-20} />}
                            />
                         
                            <VictoryBar
                                style={{ data: { fill: "yellow" } }}
                                alignment="start"
                                data={this.props.meals}
                                x='type'
                                y='fat'
                                labels={(d) => 'fat'}
                                labelComponent={<VictoryLabel dy={-10}/>}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </div>
            )
        }
    }
}

export default connect(null)(MacroTracker)
