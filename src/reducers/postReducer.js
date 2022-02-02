function PostReducer(state, action) {
  switch (action.type) {
    case "read_posts": {
      return { ...state, posts: action.payload.posts };
    }

    case "add_post": {
      return { ...state, posts: [action.payload.newPost, ...state.posts] };
    }
    case "update_post": {
      let updatedPost = action.payload.updatedPost;
      let postIndex = state.posts.findIndex((obj) => obj.id === updatedPost.id);
      let posts = state.posts;
      posts[postIndex] = updatedPost;
      return { ...state, posts: [...posts] };
    }
    default:
      return state;
  }
}

export default PostReducer;
