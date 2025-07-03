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

module.exports = {
    totalLikes,
    dummy,
    favoriteBlog
}