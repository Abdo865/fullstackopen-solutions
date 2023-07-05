const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

const favoriteBlog = (blogs) => {
  let fav = blogs[0];
  blogs.forEach((blog) => {
    if (blog["likes"] > fav["likes"]) fav = blog;
  });
  return { title: fav["title"], author: fav["author"], likes: fav["likes"] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
