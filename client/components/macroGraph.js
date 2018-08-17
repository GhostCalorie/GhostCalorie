import React from 'react'
import * as V from 'victory'
import {VictoryBar, VictoryStack, VictoryGroup, VictoryChart} from 'victory'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const MacroGraph = props => {
  const {daysToGraph} = props
  console.log(daysToGraph)


  const getBarData = () => {
    return [1, 2, 3, 4, 5].map(() => {
      return [
        {x: 1, y: Math.random()},
        {x: 2, y: Math.random()},
        {x: 3, y: Math.random()}
      ]
    })
  }


  return (


    <div style={{fontSize: 2}}>
      <VictoryChart domainPadding={{x: 5}} width={400} height={400} offset={10}
                    >
        <VictoryGroup offset={10} style={{data: {width: 8}}}>
          <VictoryStack colorScale={'red'}>
            {


              groupByMeal(daysToGraph, 'protein').map((data, index) => {

                console.log(data)
                return <VictoryBar key={index} data={data}/>


              })
            }
          </VictoryStack>
          <VictoryStack colorScale={'green'}>
            {


              groupByMeal(daysToGraph, 'carbs').map((data, index) => {

                return <VictoryBar key={index} data={data}/>


              })
            }
          </VictoryStack>
          <VictoryStack colorScale={'blue'}>
            {


              groupByMeal(daysToGraph, 'fat').map((data, index) => {

                return <VictoryBar key={index} data={data}/>


              })
            }
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const groupByMeal = (daysToGraph, macroToGroup) => {
  let mealGroupings = [
    [],
    [],
    [],
    []

  ]

  daysToGraph.forEach(day => {

    mealGroupings[0].push({x: day.meals[0].createdAtString, y: day.meals[0][macroToGroup]})
    mealGroupings[1].push({x: day.meals[1].createdAtString, y: day.meals[1][macroToGroup]})
    mealGroupings[2].push({x: day.meals[2].createdAtString, y: day.meals[2][macroToGroup]})
    mealGroupings[3].push({x: day.meals[3].createdAtString, y: day.meals[3][macroToGroup]})

  })


  return mealGroupings


}


export default connect(mapState)(MacroGraph)

/**
 * PROP TYPES
 */






