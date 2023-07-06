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

const mostBlogs = (blogs) => {
  const most = {};
  let max = blogs[0]["author"];
  blogs.forEach((blog) => {
    if (most[blog.author]) {
      most[blog.author].blogs++;
      if (most[blog.author].blogs > most[max].blogs) max = blog.author;
    } else most[blog.author] = { author: blog.author, blogs: 1 };
  });
  return most[max];
};

const mostLikes = (blogs) => {
  const most = {};
  let max = blogs[0]["author"];
  blogs.forEach((blog) => {
    if (most[blog.author]) {
      most[blog.author].likes += blog["likes"];
      if (most[blog.author].likes > most[max].likes) max = blog.author;
    } else most[blog.author] = { author: blog.author, likes: blog.likes };
  });
  return most[max];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
