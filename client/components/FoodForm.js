import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let FoodForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div>
      <h3>Add/Edit Food</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <Field 
          name="name" 
          component="input" 
          type="text" 
          />
          <label htmlFor="name">Name of Food</label>
        </div>
        <div>
          <Field 
          name="calories" 
          component="input" 
          type="number" 
          />
          <label htmlFor="calories">Calories</label>
          {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
        </div>
        <div className="col s12 input-field">
          <Field
            id="description"
            name="description"
            component="textarea"
            className="materialize-textarea"
          />
          <label htmlFor="description">Food Description</label>
        </div>
        <button disabled={pristine || submitting} type="submit">
          Submit
        </button>
      </form>
      {/* Hackish, needs to be rethought, but neccessary to keep materialize from
      blocking input with labels. see https://materializecss.com/text-inputs.html */}
      {/* <script>
        {setTimeout(() => {
          // M.AutoInit()
          M.updateTextFields()
          M.textareaAutoResize(document.getElementById('description'))
        }, 1)}
      </script> */}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  //only for edit, if there is a id in the url
  initialValues: state.foods.byId[match.params.foodId]
})

FoodForm = reduxForm({form: 'foodForm'})(FoodForm)
FoodForm = connect(mapStateToProps, mapDispatchToProps)(FoodForm)

export default FoodForm
