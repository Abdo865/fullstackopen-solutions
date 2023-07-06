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
      most[blog.author]++;
      if (most[blog.author] > most[max]) max = blog.author;
    } else most[blog.author] = 1;
  });
  return max.toString();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
