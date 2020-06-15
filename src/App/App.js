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
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

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
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this)
    this.handleFavoriteBookmark = this.handleFavoriteBookmark.bind(this)
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

  handleFavoriteBookmark = bookmarkId => {

    //find the bookmark with bookmarkId
    //set isFavorite = true on that bookmark
    fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
      method: 'Put',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({is_favorite: true}),
    })

    this.setState(prevState => {
      return {
        bookmarks: prevState.bookmarks.map(bookmark => {
          if (bookmark.id === bookmarkId) {
            bookmark.is_favorite = !bookmark.is_favorite
          }
          return bookmark
        })
      }

    })
  }


  handleDeleteBookmark = (confirmed) => {

    const bookmarkId = this.state.bookmarkToDelete

    if (confirmed) {

      fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then(() => {

        this.setState({
          bookmarks: this.state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
        })
      })
      .catch(error => {
        console.error({ error })
      })
    }

    this.setState({ showConfirmationModal: false })
  }

  handleDeleteCategory = (confirmed) => {

    if (confirmed) {

      fetch(`${config.API_ENDPOINT}/categories/${this.state.categoryToDelete}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(() => {
          this.setState({
            categoryToDelete: null,
            categories: this.state.categories.filter(category => category.id !== this.state.categoryToDelete)
          })
        })
        .catch(error => {
          console.error({ error })
        })
    }

    this.setState({ showConfirmationModal: false })
  }

  handleShowDeleteCategoryConfirmationModal = (message, categoryId) => {
    this.setState({
      categoryToDelete: categoryId,
      showConfirmationModal: true,
      confirmationMessage: message
    })
  }

  handleShowDeleteBookmarkConfirmationModal = (message, bookmarkId) => {
    this.setState({
      bookmarkToDelete: bookmarkId,
      showConfirmationModal: true,
      confirmationMessage: message
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
      deleteBookmark: this.handleDeleteBookmark,
      favoriteBookmark: this.handleFavoriteBookmark,
      deleteCategory: this.handleDeleteCategory,
      showDeleteCategoryConfirmationModal: this.handleShowDeleteCategoryConfirmationModal,
      showDeleteBookmarkConfirmationModal: this.handleShowDeleteBookmarkConfirmationModal
    }

    return (
      <ApiContext.Provider value={value}>
        <ConfirmationModal
          show={this.state.showConfirmationModal}
          message={this.state.confirmationMessage}
          handleConfirmationModal={(confirmed) => this.state.categoryToDelete ? value.deleteCategory(confirmed) : value.deleteBookmark(confirmed)}>

        </ConfirmationModal>
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
