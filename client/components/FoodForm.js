import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let FoodForm = props => {
  const {handleSubmit, pristine, submitting} = props
  console.log('initial value for add', props.initialValues)
  return (
    <div className="container">
      <h3>Add/Edit Food</h3>
      <br />
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12">
        <label htmlFor="brand_name">Name of Brand</label>
          <Field 
          name="brand_name" 
          component="input" 
          type="text" 
          />
        </div>
        <div className="col s12 m6">
        <label htmlFor="item_name">Name</label>

          <Field 
          name="item_name" 
          component="input" 
          type="text" 
          />
          {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
        </div>
        <div className="col s12 m6">
        <label htmlFor="nf_calories">Calories</label>
          <Field
            name="nf_calories"
            component="input"
            type="number"
          />
        </div>
        <div className="col s12 m6">
        <label htmlFor="nf_sodium">Sodium</label>
          <Field
            name="nf_sodium"
            component="input"
            type="number"
          />
        </div>
        <div className="col s12 m6">
        <label htmlFor="nf_protein">Protein</label>
          <Field
            name="nf_protein"
            component="input"
            type="number"
          />
        </div>
        <div className="col s12 m6">
        <label htmlFor="nf_sugars">Sugars</label>
          <Field
            name="nf_sugars"
            component="input"
            type="number"
          />
        </div>
        <div className="col s12 m6">
        <label htmlFor="nf_total_carbohydrate">Total Carbohydrate</label>
          <Field
            name="nf_total_carbohydrate"
            component="input"
            type="number"
          />
        </div>
        <div className="col s12 m6">
        <label htmlFor="total_fat">Total Fat</label>
          <Field
            name="total_fat"
            component="input"
            type="number"
          />
        </div>
        <button className="btn waves-effect waves-light" type="submit">
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

const mapEdit = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  //only for edit, if there is a id in the url
  initialValues: state.foods.byId[match.params.foodId],
})

const mapAdd = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  //only for edit, if there is a id in the url
  initialValues: state.foods.dbfoods.hits[match.params.foodId].fields,
})

FoodForm = reduxForm({form: 'foodForm'})(FoodForm)
export const AddFormField = connect(mapAdd, mapDispatchToProps)(FoodForm)
export const EditFormField = connect(mapEdit, mapDispatchToProps)(FoodForm)

