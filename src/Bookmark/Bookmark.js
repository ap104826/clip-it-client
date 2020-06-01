import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Bookmark.css'

export default class Bookmark extends React.Component {
  static defaultProps ={
    onDeleteBookmark: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    // fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(() => {
    this.context.deleteBookmark(bookmarkId)
        // allow parent to perform extra behaviour
        // this.props.onDeleteBookmark(bookmarkId)
      // })
      // .catch(error => {
      //   console.error({ error })
      // })
  }

  render() {
    const { title, id, modified, category_id } = this.props
    return (
      <div className='Bookmark'>
        <img src='https://fitnessreloaded.com/wp-content/uploads/brizy/166/assets/images/iW=1328&iH=745&oX=0&oY=132&cW=1328&cH=480/different-types-of-planks-1_p9lri3.jpg' width='250'/>
        <h2 className='Bookmark__title'>
          <Link to={`/bookmark/${id}`}>
            {title}
          </Link>
        </h2>
        <p className='Bookmark__description'>
          We’ve all heard of the plank – what we may or may not realize is how many different types of
        </p>
        <div className='Bookmark__footer'>
          <div className='Bookmark__category'>
            <span className='Date'>
              travel
            </span>
          </div>
          <div className='Bookmark__footer-buttons'>
            <button
              className='Bookmark__delete'
              type='button'
              onClick={this.handleClickDelete}
            >
              <FontAwesomeIcon icon='share' />
              {' '}
              share
            </button>
            <button
              className='Bookmark__delete'
              type='button'
              onClick={this.handleClickDelete}
            >
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
              remove
            </button>
          </div>
          
        </div>
      </div>
    )
  }
}
