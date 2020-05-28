import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BookmarkListNav from '../BookmarkListNav/BookmarkListNav'
import BookmarkPageNav from '../BookmarkPageNav/BookmarkPageNav'
import BookmarkListMain from '../BookmarkListMain/BookmarkListMain'
import BookmarkPageMain from '../BookmarkPageMain/BookmarkPageMain'
import AddCategory from '../AddCategory/AddCategory'
import AddBookmark from '../AddBookmark/AddBookmark'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'


class App extends Component {
  state = {
    bookmarks: [],
    categories: [],
  };

  componentDidMount() {
    this.setState({
      bookmarks: [
        {
          "id": 5,
          "title": "yahoo bookmark",
          "category_id": null,
          "thumbnail_url": null,
          "description": null,
          "is_favorite": null,
          "link": "www.yahoo.com",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 3,
          "title": "facebook",
          "category_id": null,
          "thumbnail_url": null,
          "description": null,
          "is_favorite": true,
          "link": "www.yahoo.com",
          "modified": "2020-05-28T17:38:32.868Z"
        },
        {
          "id": 4,
          "title": "facebook",
          "category_id": null,
          "thumbnail_url": null,
          "description": null,
          "is_favorite": null,
          "link": "www.google.com",
          "modified": "2020-05-28T17:48:21.874Z"
        }
      ],
      categories: [
        {
          "id": 3,
          "name": "travel",
          "modified": "2020-05-28T18:17:29.257Z"
        }
      ]
    })
  }

  handleAddCategory = category => {
    this.setState({
      categories: [
        ...this.state.categories,
        category
      ]
    })
  }

  handleAddBookmark = bookmark => {
    this.setState({
      bookmarks: [
        ...this.state.bookmarks,
        bookmark
      ]
    })
  }

  handleDeletebookmark = bookmarkId => {
    this.setState({
      bookmarks: this.state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/category/:category_id'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={BookmarkListNav}
          />
        )}
        <Route
          path='/bookmark/:bookmarkId'
          component={BookmarkPageNav}
        />
        <Route
          path='/add-category'
          component={BookmarkPageNav}
        />
        <Route
          path='/add-bookmark'
          component={BookmarkPageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/category/:category_id'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={BookmarkListMain}
          />
        )}
        <Route
          path='/bookmark/:bookmarkId'
          component={BookmarkPageMain}
        />
        <Route
          path='/add-category'
          component={AddCategory}
        />
        <Route
          path='/add-bookmark'
          component={AddBookmark}
        />
      </>
    )
  }

  render() {
    const value = {
      bookmarks: this.state.bookmarks,
      categories: this.state.categories,
      addCategory: this.handleAddCategory,
      addBookmark: this.handleAddBookmark,
      deleteBookmark: this.handleDeleteBookmark,
    }
    console.log({value})
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>ClipIt</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App
