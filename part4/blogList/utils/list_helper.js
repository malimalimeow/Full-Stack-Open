const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    return blogs.reduce((sum, b) => sum + b.likes, 0);
  }
};

const favoriteBlog = (blogs) => {
  let MostFavoriteBlog = {};
  let MostLikes = 0;

  if (blogs.length === 0) {
    return null;
  } else if (blogs.length === 1) {
    return blogs;
  } else {
    blogs.forEach((blog) => {
      if (blog.likes >= MostLikes) {
        MostFavoriteBlog = blog;
        MostLikes = blog.likes;
      }
    });
  }

  return MostFavoriteBlog;
};

const mostBlogs = (blogs) => {
  let count = {};
  let mostBlogsAuthor = "";
  let mostBlogs = 0;

  if (blogs.length === 0) {
    return null;
  } else if (blogs.length === 1) {
    return { author: blogs[0].author, blogs: 1 };
  } else {
    blogs.forEach((blog) => {
      count[blog.author] = (count[blog.author] || 0) + 1;

      if (count[blog.author] > mostBlogs) {
        mostBlogs = count[blog.author];
        mostBlogsAuthor = blog.author;
      }
    });
  }
  return { author: mostBlogsAuthor, blogs: mostBlogs };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else if (blogs.length === 1) {
    return { author: blogs[0].author, likes: blogs[0].likes };
  } else {
    const authors = _.groupBy(blogs, "author");
    const likes = _.mapValues(authors, (blogs) => _.sumBy(blogs, "likes"));
    const maxAuthor = _.maxBy(Object.keys(likes), (aut) => likes[aut]);
    return { author: maxAuthor, likes: likes[maxAuthor] };
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
