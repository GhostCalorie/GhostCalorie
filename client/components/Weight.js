import React, {Component} from 'react'
import {connect} from 'react-redux'
import { me, fetchDay, newDay} from '../store'
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory'


class Weight extends Component {

    async componentDidMount() {
        await this.props.getUser()
        await this.props.fetchDay(this.props.user)
        
    }
    
    async componentDidUpdate() {
        await this.generateData()
    }

    render() {
        
        return(
            <div>
            <h1>WEIGHT PAGE</h1>
            <VictoryChart
            theme={VictoryTheme.material}>
                <VictoryLine
                    style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                      ]}
                    />
            </VictoryChart>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    return {
      user: state.user.id,
      day: state.days,
      myDay: state.days.myDay
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getUser: () => {
        dispatch(me())
      },
      fetchDay: (id) => {
        dispatch(fetchDay(id))
      },
      newDay: (day) => {
        dispatch(newDay(day))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Weight)