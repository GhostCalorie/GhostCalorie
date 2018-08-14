import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Links = () => (
  <span>
    <li className="grey-text text-lighten-4 left">
      <Link to="/calorie" className="brand-logo logo-container">
        <i className="material-icons">wb_sunny</i>
        <span className="flow-text truncate"> My Day </span>
      </Link>{' '}
    </li>
    <li className="grey-text text-lighten-4 center">
      <Link to="/" className="brand-logo logo-container">
        <i className="material-icons">developer_board</i>
        <span className="flow-text truncate"> Log </span>
      </Link>{' '}
    </li>
    <li>
      <Link to="/" className="brand-logo logo-container right">
        <i className="material-icons">person</i>
        <span className="flow-text truncate"> Me </span>
      </Link>{' '}
    </li>
  </span>
)

const Footer = props => (
  <footer className="page-footer green" role="navigation">
    <div className="footer-wrapper container">
      <Links />
    </div>
  </footer>
)

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id,
//   }
// }

export default connect(null)(Footer)
