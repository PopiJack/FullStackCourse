const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0
  const sum = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes,
    initialValue
  ); 
  return sum
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  const likesArray = blogs.map((blog) => blog.likes)
  const maxValue = Math.max(...likesArray)
  
  return blogs.find(({ likes }) => likes === maxValue)
}

const mostBlogs = (blogs) => {
  const authors = lodash.mapValues(blogs, function(o) { return o.author })
  console.log(authors)

  const groupedAuthors = lodash.groupBy(authors)
  console.log(groupedAuthors)

  const authorWithNumberOfBlogs = lodash.mapValues(groupedAuthors, function(o) { return o.length })
  console.log(authorWithNumberOfBlogs)

  const numberOfBlogs = lodash.values(authorWithNumberOfBlogs)
  const maxNumberOfBlogs = Math.max(...numberOfBlogs)
  console.log(maxNumberOfBlogs)

  const maxAuthor = lodash.pickBy(authorWithNumberOfBlogs, value => value === maxNumberOfBlogs)
  const smallerList = lodash.chunk(maxAuthor, 1)
  console.log(smallerList)

  return maxAuthor
} 

module.exports = {
    totalLikes,
    dummy,
    favoriteBlog, 
    mostBlogs,
}