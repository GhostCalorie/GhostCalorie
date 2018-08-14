import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let FoodForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div>
      <h3>Edit Food</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="brand_name">Name of Brand</label>
          <Field 
          name="brand_name" 
          component="input" 
          type="text" 
          />
        </div>
        <div>
        <label htmlFor="item_name">Name</label>

          <Field 
          name="item_name" 
          component="input" 
          type="text" 
          />
          {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
        </div>
        <div>
        <label htmlFor="nf_calories">Calories</label>
          <Field
            name="nf_calories"
            component="input"
            type="number"
          />
        </div>
        <div>
        <label htmlFor="nf_sodium">Sodium</label>
          <Field
            name="nf_sodium"
            component="input"
            type="number"
          />
        </div>
        <div>
        <label htmlFor="nf_protein">Protein</label>
          <Field
            name="nf_protein"
            component="input"
            type="number"
          />
        </div>
        <div>
        <label htmlFor="nf_sugars">Sugars</label>
          <Field
            name="nf_sugars"
            component="input"
            type="number"
          />
        </div>
        <div>
        <label htmlFor="nf_total_carbohydrate">Total Carbohydrate</label>
          <Field
            name="nf_total_carbohydrate"
            component="input"
            type="number"
          />
        </div>
        <div>
        <label htmlFor="total_fat">Total Fat</label>
          <Field
            name="total_fat"
            component="input"
            type="number"
          />
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
  initialValues: state.foods.byId[match.params.foodId],
})

FoodForm = reduxForm({form: 'foodForm'})(FoodForm)
FoodForm = connect(mapStateToProps, mapDispatchToProps)(FoodForm)

export default FoodForm
