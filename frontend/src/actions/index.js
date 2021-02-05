import { ADD_FETCHED_DATA, 
    ADD_bg_DATA,ADD_RESULT_DATA,SAVE_SELECT, ADD_TO_CART,
    REMOVE_FROM_CART,PLUS_LENGTH,MINUS_LENGTH, ADD_COMMENT,
    ADD_RATINNG,CHECK_RATING,ADD_POST_DATA,ADD_POST_TO_CART
    ,REMOVE_POST_FROM_CART,ADD_EVENT_DATA,SAVE_SELECT_EVENT,
    SAVE_SELECT_POST,ADD_COMMENT_POST,REMOVE_ALL,REMOVE_ALL_POST_CART
    ,SAVE_SELECT_BG,ADD_RATINNG_BG,CHECK_RATING_BG,PARTICIPATE,ADD_IMG,ADD_PRESELL_DATA} from './types.js';
import axios from 'axios';
import {newsApi,boardgamesApi,searchApi,selectedApi,selectedEventApi,presellListApi,
    commentsApi,postListApi,eventListApi,selectedPostApi,commentsPostsApi,participateApi} from '../api/apis'

    export const removeAllFromCart = (id) => {
        return {
          type: REMOVE_ALL,
          payload: {
              id
          }
        }
    }
    export const removeAllPostsFromCart = (id) => {
        return {
          type: REMOVE_ALL_POST_CART,
          payload: {
              id
          }
        }
    }
export const removeFromCart = (id) => {
    return {
      type: REMOVE_FROM_CART,
      payload: {
          id
      }
    }
}
export const removePostFromCart = (id) => {
    return {
      type: REMOVE_POST_FROM_CART,
      payload: {
          id
      }
    }
}

export const fetchData = () => {
    return (dispatch) => {
        return axios.get(newsApi)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_FETCHED_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const bgData = () => {
    return (dispatch) => {
        return axios.get(boardgamesApi)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_bg_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const postData = (id) => {
    return (dispatch) => {
        return axios.get(postListApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_POST_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const eventsData = (id) => {
    return (dispatch) => {
        return axios.get(eventListApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_EVENT_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const presellsData = (id) => {
    return (dispatch) => {
        return axios.get(presellListApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_PRESELL_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const commentData = (id) => {
    return (dispatch) => {
        return axios.get(commentsApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_COMMENT,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const participateData = (id) => {
    return (dispatch) => {
        return axios.get(participateApi+id+'/participate')
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: PARTICIPATE,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};


export const commentPostData = (id) => {
    return (dispatch) => {
        return axios.get(commentsPostsApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_COMMENT_POST,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const resultData = (entry) => {
    return (dispatch) => {
        return axios.get(searchApi+entry)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: ADD_RESULT_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const selectedBGData = (id) => {
    return (dispatch) => {
        return axios.get(boardgamesApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: SAVE_SELECT_BG,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const selectedData = (id) => {
    return (dispatch) => {
        return axios.get(selectedApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: SAVE_SELECT,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const selectedEventData = (id) => {
    return (dispatch) => {
        return axios.get(selectedEventApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: SAVE_SELECT_EVENT,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const selectedPostData = (id) => {
    return (dispatch) => {
        return axios.get(selectedPostApi+id)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: SAVE_SELECT_POST,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
export const addToCart =  (data) => {
    return {
      type: ADD_TO_CART,
      payload: data
    }
};
export const addPostToCart =  (data) => {
    return {
      type: ADD_POST_TO_CART,
      payload: data
    }
};
export const addComment =  (data) => {
    return {
      type: ADD_COMMENT,
      payload: data
    }
};
export const addCommentPost =  (data) => {
    return {
      type: ADD_COMMENT_POST,
      payload: data
    }
};
export const addRating =  (data) => {
    return {
      type: ADD_RATINNG,
      payload: data
    }
};
export const checkRating =  (username,id) => {
    return {
      type: CHECK_RATING,
      payload: {
          username,
          id
      }
    }
};
export const addRatingBG =  (data) => {
    return {
      type: ADD_RATINNG_BG,
      payload: data
    }
};
export const addIMG =  (data) => {
    return {
      type: ADD_IMG,
      payload: data
    }
};
export const checkRatingBG =  (username,id) => {
    return {
      type: CHECK_RATING_BG,
      payload: {
          username,
          id
      }
    }
};
export const counterMinus=(id)=>{
    return{
        type: MINUS_LENGTH,
        payload: {
            id
        }

    }
}
export const counterPlus=(data)=>{
    return{
        type: PLUS_LENGTH,
        payload: data
    }
}