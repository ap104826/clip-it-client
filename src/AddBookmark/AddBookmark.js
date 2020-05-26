import React, { Component } from 'react'
import ClipitForm from '../ClipitForm/ClipitForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddBookmark.css'

export default class AddBookmark extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newBookmark = {
      name: e.target['bookmark-name'].value,
      content: e.target['bookmark-content'].value,
      category_id: e.target['bookmark-category-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/categories`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBookmark),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(bookmark => {
        this.context.addBookmark(bookmark)
        this.props.history.push(`/category/${bookmark.category_id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { categories = [] } = this.context
    return (
      <section className='AddBookmarks'>
        <h2>Create a bookmark</h2>
        <ClipitForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='bookmark-name-input'>
              Name
            </label>
            <input type='text' id='bookmark-name-input' name='bookmark-name' />
          </div>
          <div className='field'>
            <label htmlFor='bookmark-content-input'>
              Content
            </label>
            <textarea id='bookmark-content-input' name='bookmark-content' />
          </div>
          <div className='field'>
            <label htmlFor='bookmark-category-select'>
              Category
            </label>
            <select id='bookmark-category-select' name='bookmark-category-id'>
              <option value={null}>...</option>
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add bookmark
            </button>
          </div>
        </ClipitForm>
      </section>
    )
  }
}
