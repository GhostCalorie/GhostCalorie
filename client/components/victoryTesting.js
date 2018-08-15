import React from 'react'
import * as V from 'victory'
import {VictoryBar, VictoryStack, VictoryGroup, VictoryChart} from 'victory'


class VictoryTest extends React.Component {


  render() {
    const getBarData = () => {
      return ['breakfast', 'lunch', 'snacks'].map(() => {
        return [
          {x: 'day1', y: Math.random()},
          {x: 'day2', y: Math.random()},
          {x: 'day3', y: Math.random()},
          {x: 'day4', y: Math.random()}


        ]
      })
    }

    return (
      <div>
        <VictoryChart domainPadding={{x: 50}} width={400} height={400}>
          <VictoryGroup offset={20} style={{data: {width: 15}}}>
            <VictoryStack name={'calories'} colorScale={'red'}>
              {getBarData().map((data, index) => {
                console.log(data)
                return <VictoryBar key={index} data={data}/>
              })}
            </VictoryStack>
            <VictoryStack name={'protein'} colorScale={'green'}>
              {getBarData().map((data, index) => {
                return <VictoryBar key={index} data={data}/>
              })}
            </VictoryStack>
            <VictoryStack name={'sugar'} colorScale={'blue'}>
              {getBarData().map((data, index) => {
                return <VictoryBar key={index} data={data}/>
              })}
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart>
      </div>
    )
  }
}

export default VictoryTest
