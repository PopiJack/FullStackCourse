const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('bestAuthor', () => {
  const listWithZeroBlog = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '1',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '2342sa22332343',
      title: 'Go To Statement Considered ¿',
      author: '2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a4254a676234d17f8',
      title: 'Go ',
      author: '2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a4254a676234d17f8',
      title: 'Go ',
      author: '2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
  ]
  const listWithMultipleFavoritesBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    },
    {
      _id: '2342sa22332343',
      title: 'Go To Statement Considered ¿',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a4254a676234d17f8',
      title: 'Go ',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    }
  ]

  test('of bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlog)

    assert.notStrictEqual(result, {'2': 3})
  })
})