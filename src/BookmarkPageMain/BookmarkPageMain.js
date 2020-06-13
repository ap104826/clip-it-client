import React from 'react'
import Bookmark from '../Bookmark/Bookmark'
import ApiContext from '../ApiContext'
import { findBookmark } from '../bookmarks-helpers'
import './BookmarkPageMain.css'

export default class BookmarkPageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleFavoriteBookmark = bookmarkId => {
    this.props.history.push(`/`)
  }

  handleDeleteBookmark = bookmarkId => {
    this.props.history.push(`/`)
  }

  render() {
    const { bookmarks=[] } = this.context
    const { bookmarkId } = this.props.match.params
    const bookmark = findBookmark(bookmarks, bookmarkId) || { content: '' }
    return (
      <section className='BookmarkPageMain'>
        <Bookmark
          id={bookmark.id}
          title={bookmark.title}
          category_id={bookmark.category_id}
          modified={bookmark.modified}
        />
        <div className='BookmarkPageMain__content'>
          {bookmark.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
