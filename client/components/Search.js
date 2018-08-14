import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AllFoods } from '../components'
import { Link } from 'react-router-dom'
import { fetchDBFood } from '../store'
import {debounce} from './lodash'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            food: ''
        }
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
        debounce(this.props.fetchDBFood(evt.target.value), 500)
    }

    render() {
        console.log("in the search componentn")
        return (
            <div>
                {/* {console.log('in the search component', this.props)} */}
                <div className="col s12 l3 z-depth-2">
                    <form>
                        <label className="label-icon valign-wrapper">
                            <i className="material-icons">search</i> Search
                        </label>
                        <input
                            type="search"
                            id="search"
                            className="input-field"
                            placeholder="Search..."
                            name="food"
                            onChange={this.handleChange}
                        />
                    </form>
                    <div className="col s12">
                        <Link
                            to={`/`}
                            className="waves-effect orange darken-2 waves-light btn"
                        >
                            Done
                        </Link>
                    </div>
                </div>
                <div>
                    <AllFoods dbfoods={this.props.food.dbfoods} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dbfoods: state.dbfoods,
        food: state.foods,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDBFood: (query) => {
            // console.log('query in allfoods component', query)
            dispatch(fetchDBFood(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)