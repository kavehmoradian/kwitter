function RatingReducer(state, action) {
  switch (action.type) {
    case "like": {
      return {
        ...state,
        likes: [...state.likes, action.payload.user],
        kind: action.payload.kind,
      };
    }

    case "unLike": {
      return {
        ...state,
        likes: action.payload.likes,
        kind: action.payload.kind,
      };
    }
    case "unDisLike": {
      return {
        ...state,
        dislikes: action.payload.dislikes,
        kind: action.payload.kind,
      };
    }
    case "disLike": {
      return {
        ...state,
        dislikes: [...state.dislikes, action.payload.user],
        kind: action.payload.kind,
      };
    }
    default:
      return state;
  }
}

export default RatingReducer;
