import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryListNav from '../CategoryListNav/CategoryListNav'
import BookmarkListMain from '../BookmarkListMain/BookmarkListMain'
import BookmarkPageMain from '../BookmarkPageMain/BookmarkPageMain'
import AddCategory from '../AddCategory/AddCategory'
import AddBookmark from '../AddBookmark/AddBookmark'
import ApiContext from '../ApiContext'
import './App.css'
import config from '../config'
import CircleButton from '../CircleButton/CircleButton'


class App extends Component {
  state = {
    bookmarks: [],
    categories: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/bookmarks`),
      fetch(`${config.API_ENDPOINT}/categories`)
    ])
      .then(([bookmarksRes, categoriesRes]) => {
        if (!bookmarksRes.ok)
          return bookmarksRes.json().then(e => Promise.reject(e))
        if (!categoriesRes.ok)
          return categoriesRes.json().then(e => Promise.reject(e))

        return Promise.all([
          bookmarksRes.json(),
          categoriesRes.json(),
        ])
      })
      .then(([bookmarks, categories]) => {
        this.setState({ bookmarks, categories })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  constructor(props) {
    super(props)
    this.handleAddBookmark = this.handleAddBookmark.bind(this)
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this)
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
            component={CategoryListNav}
          />
        )}
        <Route
          path='/add-category'
          component={CategoryListNav}
        />
        <Route
          path='/add-bookmark'
          component={CategoryListNav}
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
          render={(props) => <AddCategory {...props} />}
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
              <FontAwesomeIcon icon='bookmark' color='#4ec281' />
            </h1>
            <div className='CategoryListNav__button-wrapper'>
              <CircleButton
                tag={Link}
                to='/add-category'
                type='button'
                className='CategoryListNav__add-category-button'
              >
                <FontAwesomeIcon className='mr-1' icon='plus' />
                Category
              </CircleButton>
              <CircleButton
                tag={Link}
                to='/add-bookmark'
                className='CategoryListNav__add-category-button'
                type='button'>
                <FontAwesomeIcon className='mr-1' icon='plus' />
                Bookmark
              </CircleButton>
            </div>
          </header>

          <div className="App__main-container">
            <nav className='App__nav d-sm-block'>
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
