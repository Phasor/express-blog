const truncatePost = (post, length) => {
  if (post.length > length) {
    return post.substring(0, length) + '...';
  }
  return post;
};

export default truncatePost;