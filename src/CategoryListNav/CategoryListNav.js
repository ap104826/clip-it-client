import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countBookmarksForCategory } from '../bookmarks-helpers'
import './CategoryListNav.css'
import { Badge } from 'react-bootstrap'

export default class CategoryListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { categories = [], bookmarks = [] } = this.context
    return (
      <div className='CategoryListNav'>
        <ul className='CategoryListNav__list'>
          <li key='all'>
            <NavLink
              className='CategoryListNav__category-link'
              to={`/`}
            >
              All
              <Badge variant="light" className="ml-1">
                {countBookmarksForCategory(bookmarks, null)}
              </Badge>
            </NavLink>
          </li>
          {categories.map(category =>
            <li key={category.id}>
              <NavLink
                className='CategoryListNav__category-link'
                to={`/category/${category.id}`}
              >
                {category.name}
                <Badge variant="light" className="ml-1">
                  {countBookmarksForCategory(bookmarks, category.id)}
                </Badge>
              </NavLink>
            </li>
          )}
        </ul>

      </div>
    )
  }
}
