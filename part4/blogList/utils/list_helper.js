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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
