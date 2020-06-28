import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import { countBookmarksForCategory } from '../bookmarks-helpers'
import './CategoryListNav.css'
import config from '../config'



export default class CategoryListNav extends React.Component {
  static defaultProps = {
    onDeleteCategory: () => { },
  }
  static contextType = ApiContext;


  handleClickDelete = (e, categoryId) => {
    e.preventDefault()
    if (window.confirm("Are you sure you want to delete this category?")) {
      this.context.deleteCategory(categoryId)
    }
  }

  render() {
    const { categories = [], bookmarks = [] } = this.context
    return (
      <div className='CategoryListNav'>

        <ul className='CategoryListNav__list'>
          <li key='all'>
            <NavLink
              exact={true}
              className='CategoryListNav__category-link'
              to={`/`}
            >
              All
              <div className="CategoryListNav__num-bookmarks">
                {countBookmarksForCategory(bookmarks, null)}
              </div>
            </NavLink>
          </li>
          {categories.map(category =>
            <li key={category.id}>
              <NavLink
                className='CategoryListNav__category-link'
                to={`/category/${category.id}`}
              >
                {category.name}
                <div className="CategoryListNav__num-bookmarks">
                  {countBookmarksForCategory(bookmarks, category.id)}
                </div>
                <FontAwesomeIcon icon='trash' onClick={(e) => this.handleClickDelete(e, category.id)} />
              </NavLink>
            </li>
          )}
        </ul>

      </div>
    )
  }
}
