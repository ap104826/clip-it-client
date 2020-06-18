import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import './Bookmark.css'

export default class Bookmark extends React.Component {
  static defaultProps = {
    onDeleteBookmark: () => { }
  }
  static contextType = ApiContext;

  handleClickFavorite = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    this.context.favoriteBookmark(bookmarkId)

  }

  handleClickDelete = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    this.context.showDeleteBookmarkConfirmationModal('Are you sure you want to delete this bookmark?', bookmarkId)
  }

  getCategoryFromCategoryId(categoryId) {

    if (!categoryId) {
      return { name: '' }
    }

    const category = this.context.categories.find(category => category.id === categoryId)

    if (!category) {
      return { name: undefined }
    }

    return category
  }

  render() {
    const { title, id, modified, category_id, link, thumbnail_url, is_favorite } = this.props
    return (
      <div key={id} className='Bookmark'>
        <img className="Bookmark__img" src={thumbnail_url ? `${thumbnail_url}` : 'https://via.placeholder.com/286x161'} />
        <div className="Bookmark__body">
          <div className='Bookmark__title'>
            <a href={link} target='_blank'>{title}</a>
          </div>
          <div className="Bookmark__footer">
            <span className={`${category_id ? 'Bookmark__category' : 'Bookmark__category visibility-hidden'}`}>
              {this.getCategoryFromCategoryId(category_id).name}
            </span>
            <FontAwesomeIcon icon={[is_favorite ? 'fas' : 'far', 'heart']} onClick={this.handleClickFavorite} />
            <button className="ClipIt__btn ClipIt__btn-primary" onClick={this.handleClickDelete}>Delete</button>

          </div>

        </div>
      </div>
    )
  }
}
