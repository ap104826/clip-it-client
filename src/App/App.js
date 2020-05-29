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
import './App.css'
import CircleButton from '../CircleButton/CircleButton'


class App extends Component {
  state = {
    bookmarks: [],
    categories: [],
  };

  constructor(props) {
    super(props)
    this.handleAddBookmark = this.handleAddBookmark.bind(this)
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this)
  }

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
        },
        {
          "id": 7,
          "title": "yahoo bookmark",
          "category_id": null,
          "thumbnail_url": null,
          "description": null,
          "is_favorite": null,
          "link": "www.yahoo.com",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 9,
          "title": "facebook",
          "category_id": null,
          "thumbnail_url": null,
          "description": null,
          "is_favorite": true,
          "link": "www.yahoo.com",
          "modified": "2020-05-28T17:38:32.868Z"
        },
        {
          "id": 8,
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
        },
        {
          "id": 4,
          "name": "food",
          "modified": "2020-05-28T18:17:29.257Z"
        }
      ]
    })
  }

  handleAddCategory = (category) => {
    this.setState({
      categories: [
        ...this.state.categories,
        category
      ]
    })
  }

  handleAddBookmark = bookmark => {
    bookmark.title = bookmark.link
    bookmark.modified = new Date()
    this.setState({
      bookmarks: [
        ...this.state.bookmarks,
        bookmark
      ]
    })
  }

  handleDeleteBookmark = bookmarkId => {
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
      deleteBookmark: this.handleDeleteBookmark
    }

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <header className='App__header'>
            <h1>
              <Link to='/'>ClipIt</Link>
              {' '}
              <FontAwesomeIcon icon='bookmark' />
            </h1>
            <div className='BookmarkListNav__button-wrapper'>
              <CircleButton
                tag={Link}
                to='/add-category'
                type='button'
                className='BookmarkListNav__add-category-button'
              >
                <FontAwesomeIcon icon='plus' />
                Category
              </CircleButton>
              <CircleButton
                tag={Link}
                to='/add-bookmark'
                className='BookmarkListNav__add-category-button'
                type='button'>
                <FontAwesomeIcon icon='plus' />
                Bookmark
              </CircleButton>
            </div>
          </header>

          <div className="App__main-container">
            <nav className='App__nav'>
              {this.renderNavRoutes()}
            </nav>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </div>

        </div>
      </ApiContext.Provider>
    )
  }
}

export default App
