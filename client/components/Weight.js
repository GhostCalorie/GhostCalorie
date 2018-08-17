import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchDay}

class Weight extends Component {
    render() {
        return(
            <h1>WEIGHT PAGE</h1>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Weight)