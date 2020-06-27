import React, { Component } from 'react'
import ClipitForm from '../ClipitForm/ClipitForm'
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddCategory extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  state = {
    validated: false
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.currentTarget
    const categoryName = form['category-name'].value
    if (form.checkValidity() === false || !categoryName) {
      this.setState({ validated: false })
    }

    const category = {
      id: this.context.categories.length + 1,
      name: categoryName
    }
    fetch(`${config.API_ENDPOINT}/categories`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(category),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(category => {
        this.context.addCategory(category)
        this.props.history.push(`/category/${category.id}`)
      })
      .catch(error => {
        console.error({ error })
      })

  }

  render() {
    return (
      <section className='AddBookmarks'>

        <h2>Create a Category</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="ClipIt__form-group">
            <label>Name</label>
            <input className="ClipIt__form-control" type="text" required name='category-name' placeholder="travel, food, etc." />
          </div>

          <button className='ClipIt__btn ClipIt__btn-secondary' onClick={() => this.props.history.goBack()}>
            Cancel
          </button>
          <button className='ClipIt__btn ClipIt__btn-primary ml-1' variant="primary" type="submit">
            Add category
          </button>
        </form>

      </section>
    )
  }
}
