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

  state = {
    validated: false
  }

  handleSubmit = e => {

    const form = e.currentTarget
    const bookmarkName = e.target['bookmark-link'].value
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      this.setState({ validated: true })
    }

    if (!bookmarkName) {
      return
    }

    const bookmark = {
      id: this.context.bookmarks.length + 1,
      name: bookmarkName
    }
    e.preventDefault()
    const newBookmark = {
      link: bookmarkName,
      category_id: parseInt(e.target['bookmark-category-id'].value)
    }
    fetch(`${config.API_ENDPOINT}/bookmarks`, {
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
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { categories = [] } = this.context
    return (
      <section className='AddBookmarks'>
        <h2>Create a Bookmark</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="ClipIt__form-group">
            <label>Link</label>
            <input className="ClipIt__form-control" type="text" required name='bookmark-link' placeholder="google.com" />
          </div>
          <div className="ClipIt__form-group">
            <label>Category</label>
            <select className="ClipIt__form-control" name='bookmark-category-id'>
              <option value={null}>...</option>
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )}
            </select>
          </div>

          <button className='ClipIt__btn ClipIt__btn-secondary' onClick={() => this.props.history.goBack()}>
            Cancel
          </button>
          <button className='ClipIt__btn ClipIt__btn-primary ml-1' type="submit">
            Add bookmark
          </button>
        </form>
      </section>
    )
  }
}
