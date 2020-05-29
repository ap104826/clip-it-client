import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Bookmark from '../Bookmark/Bookmark'
import CircleButton from '../CircleButton/CircleButton'
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
        <ul>
          {bookmarksForCategories.map(bookmark =>
            <li key={bookmark.id}>
              <Bookmark
                id={bookmark.id}
                title={bookmark.title}
                category_id={bookmark.category_id}
                modified={bookmark.modified}
              />
            </li>
          )}
        </ul>
        <div className='BookmarkListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-bookmark'
            type='button'
            className='BookmarkListMain__add-bookmark-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Bookmark
          </CircleButton>
        </div>
      </section>
    )
  }
}
