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

  render() {
    const { category_id } = this.props.match.params
    const { bookmarks = [] } = this.context
    const bookmarksForCategories = getBookmarksForCategory(bookmarks, parseInt(category_id))
    return (
      <section className='BookmarkListMain'>
        <ul className="BookmarkList">
          {bookmarksForCategories.map(bookmark =>
            <li key={bookmark.id} className='BookmarkListItem'>
              <Bookmark
                id={bookmark.id}
                title={bookmark.title}
                category_id={bookmark.category_id}
                modified={bookmark.modified}
                thumbnail_url={bookmark.thumbnail_url}
              />
            </li>
          )}
        </ul>
        
      </section>
    )
  }
}
