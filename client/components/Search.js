import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AllFoods } from '../components'
import { Link } from 'react-router-dom'
import { fetchDBFood } from '../store'
import { debounce } from 'lodash'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            food: ''
        }
        // console.log('this', this)
        // this.fetchDBFood = debounce(this.props.fetchDBFood, 250)
    }

    handleChange = evt => {
        const val = evt.target.value
        this.setState({ [evt.target.name]: val },
            // this.props.fetchDBFood(val)

        )


    }

    render() {
        return (
            <div>
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
            dispatch(fetchDBFood(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
