import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AllFoods } from '.';
import {Link} from 'react-router-dom'

class Search extends Component {

    handleChange = evt => {
        evt.preventDefault()
        history.push(`/meal/search/${evt.target.value}`)
    }

    render() {
        const { foods } = this.props
        return (
            <div>
                <div className="col s12 l3 z-depth-2">
                    <form onSubmit={this.handleSubmit}>
                        <label className="label-icon valign-wrapper">
                            <i className="material-icons">search</i> Search
                        </label>
                        <input
                            type="search"
                            id="search"
                            className="input-field"
                            placeholder="Search..."
                            name="name"
                            onChange={this.handleChange}
                        />
                    </form>
                    <div className="col s12">
                        <Link
                            to={`meal/`}
                            className="waves-effect orange darken-2 waves-light btn"
                        >
                            Done
                        </Link>
                    </div>
                </div>
                <div>
                    {/* <AllFoods food={foods} /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        foods: Object.values(state.foods.byId)
    }
}

export default connect(mapStateToProps)(Search)