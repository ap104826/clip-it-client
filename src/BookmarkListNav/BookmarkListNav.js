import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countBookmarksForCategory } from '../bookmarks-helpers'
import './BookmarkListNav.css'

export default class BookmarkListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { categories = [], bookmarks = [] } = this.context
    return (
      <div className='BookmarkListNav'>
        <ul className='BookmarkListNav__list'>
          {categories.map(category =>
            <li key={category.id}>
              <NavLink
                className='BookmarkListNav__category-link'
                to={`/category/${category.id}`}
              >
                <span className='BookmarkListNav__num-bookmarks'>
                  {countBookmarksForCategory(bookmarks, category.id)}
                </span>
                {category.name}
              </NavLink>
            </li>
          )}
        </ul>
        
      </div>
    )
  }
}
