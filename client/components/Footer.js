const Footer = props => (
  <footer className="page-footer green">
    <div className="container">
      <div className="container">
        <a className="grey-text text-lighten-3" href="/calorie">
          <i className="material-icons">wb_sunny</i>
          My Day
        </a>
        <a className="grey-text text-lighten-3 right" href="/meal">
          <i className="material-icons">developer_board</i>
          Log
        </a>
      </div>
    </div>
  </footer>
)

export default connect(null)(Footer)
