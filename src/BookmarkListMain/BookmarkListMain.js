import React from 'react'
import Bookmark from '../Bookmark/Bookmark'
import ApiContext from '../ApiContext'
import { getBookmarksForCategory } from '../bookmarks-helpers'
import './BookmarkListMain.css'

export default class BookmarkListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  categorySelected(e) {
    const categoryId = e.target.value
    if (categoryId == 'all') {
      this.props.history.push('/')
      return
    }

    this.props.history.push(`/category/${categoryId}`)

  }

  render() {
    const { category_id } = this.props.match.params
    const { bookmarks = [], categories = [] } = this.context
    const bookmarksForCategories = getBookmarksForCategory(bookmarks, parseInt(category_id))
    return (
      <div className="BookmarkListContainer">
        <div className='BookmarksList__categories-selection'>
          <label>Categories</label>
          <select className='BookmarksList__categories-dropdown' onChange={(e) => this.categorySelected(e)} value={category_id}>
            <option key='all' value='all'>All</option>
            {categories.map(category =>
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )}
          </select>
        </div>
        <div className='BookmarkList'>
          {bookmarksForCategories.map(bookmark =>
            <Bookmark
              id={bookmark.id}
              title={bookmark.title}
              link={bookmark.link}
              key={bookmark.id}
              category_id={bookmark.category_id}
              modified={bookmark.modified}
              thumbnail_url={bookmark.thumbnail_url}
              is_favorite={bookmark.is_favorite}
            />
          )}
        </div>
      </div>
    )
  }
}
