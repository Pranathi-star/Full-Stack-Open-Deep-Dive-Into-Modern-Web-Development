const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach(element => {
    total += element.likes
  });
  return total
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  let favouriteBlog = blogs[0]
  req = ["author", "likes", "title"]
  blogs.forEach(element => {
    if (element.likes > favouriteBlog.likes) {
      let newElement = {};
      for (const i in element){
        if (req.includes(i)){
          newElement[i] = element[i];
        }
      }
      favouriteBlog = newElement
    }
  })
  return favouriteBlog
}

module.exports = {
  dummy, totalLikes, favouriteBlog
}