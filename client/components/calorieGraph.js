import React from 'react'
import * as V from 'victory'
import {VictoryBar, VictoryStack, VictoryGroup, VictoryChart} from 'victory'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const CalorieGraph = props => {
  const {daysToGraph} = props
  const groupedByMeal = groupByMeal(daysToGraph)
  console.log('groupedByMeal', groupedByMeal)
  console.log('daysToGraph', daysToGraph)
  return (
    <div>
      <VictoryChart domainPadding={{x: 50}} width={400} height={400}>
        <VictoryStack name={'calories'} colorScale={'red'}>
          {


            groupedByMeal.map((data, index) => {

              return <VictoryBar key={index} data={data}/>
            })}
        </VictoryStack>


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

const groupByMeal = daysToGraph => {
  let mealGroupings = [
    [],
    [],
    [],
    []

  ]

  daysToGraph.forEach(day => {

    mealGroupings[0].push({x: day.meals[0].createdAtString, y: day.meals[0].calories})
    mealGroupings[1].push({x: day.meals[1].createdAtString, y: day.meals[1].calories})
    mealGroupings[2].push({x: day.meals[2].createdAtString, y: day.meals[2].calories})
    mealGroupings[3].push({x: day.meals[3].createdAtString, y: day.meals[3].calories})

  })


  return mealGroupings


}





export default connect(mapState)(CalorieGraph)

/**
 * PROP TYPES
 */






