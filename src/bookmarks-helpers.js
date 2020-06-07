
export const findCategory = (categories = [], category_id) =>
  categories.find(category => category.id === category_id)

export const findBookmark = (bookmarks = [], bookmarkId) =>
  bookmarks.find(bookmark => bookmark.id === bookmarkId)

export const getBookmarksForCategory = (bookmarks = [], category_id) => (
  (!category_id)
    ? bookmarks
    : bookmarks.filter(bookmark => bookmark.category_id === category_id)
)

export const countBookmarksForCategory = (bookmarks = [], category_id) => {
  return (!category_id)
    ? bookmarks.length
    : bookmarks.filter(bookmark => bookmark.category_id === category_id).length
}
