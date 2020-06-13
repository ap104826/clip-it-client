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
    this.handleFavoriteBookmark = this.handleFavoriteBookmark.bind(this)
  }

  componentDidMount() {
    this.setState({
      bookmarks: [
        {
          "id": 1,
          "title": "Airline restarts flights, cancels them again when passengers can't follow Covid-19 regulations",
          "category_id": 1,
          "thumbnail_url": "images/1.jpg",
          "description": null,
          "is_favorite": null,
          "link": "https://www.cnn.com/travel/article/lion-air-cancel-flights-coronavirus-intl-hnk/index.html",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 2,
          "title": "Easy Homemade Ramen",
          "category_id": 2,
          "thumbnail_url": "images/2.jpg",
          "description": null,
          "is_favorite": null,
          "link": "https://www.delish.com/cooking/recipe-ideas/a26258249/homemade-ramen-recipe",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 3,
          "title": "Grilled Fattoush with Za'atar Eggplant",
          "category_id": 2,
          "thumbnail_url": "images/3.jpg",
          "description": null,
          "is_favorite": null,
          "link": "https://www.food.com/recipe/grilled-fattoush-with-za-atar-eggplant-536442",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 4,
          "title": "11 Great Alternatives to the Top National Parks",
          "category_id": 1,
          "thumbnail_url": "images/5.jpg",
          "description": null,
          "is_favorite": null,
          "link": "https://www.nytimes.com/2020/06/04/travel/national-parks-social-distancing-coronavirus.html",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 5,
          "title": "What we know about Art and the Mind",
          "category_id": 3,
          "thumbnail_url": "images/7.jpg",
          "description": null,
          "is_favorite": null,
          "link": "https://www.newyorker.com/culture/cultural-comment/what-we-know-about-art-and-the-mind",
          "modified": "2020-05-28T18:18:49.984Z"
        },
        {
          "id": 6,
          "title": "11 sustainable ways to experience Yellowstone National Park",
          "category_id": 1,
          "thumbnail_url": "images/8.jpg",
          "description": null,
          "is_favorite": null,
          "link": "https://www.lonelyplanet.com/articles/sustainable-yellowstone",
          "modified": "2020-05-28T18:18:49.984Z"
        }
      ],
      categories: [
        {
          "id": 1,
          "name": "Travel",
          "modified": "2020-05-28T18:17:29.257Z"
        },
        {
          "id": 2,
          "name": "Food",
          "modified": "2020-05-28T18:17:29.257Z"
        },
        {
          "id": 3,
          "name": "Art",
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
    //fetch request for put
    fetch()
  
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
      deleteBookmark: this.handleDeleteBookmark,
      favoriteBookmark: this.handleFavoriteBookmark
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
