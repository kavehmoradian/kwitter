function PostReducer(state, action) {
  switch (action.type) {
    case "read_posts": {
      return { ...state, posts: action.payload.posts };
    }

    case "add_post": {
      return { ...state, posts: [action.payload.newPost, ...state.posts] };
    }
    default:
      return state;
  }
}

export default PostReducer;
