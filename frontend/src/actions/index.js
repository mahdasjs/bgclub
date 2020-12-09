import { ADD_FETCHED_DATA, 
    ADD_bg_DATA,ADD_RESULT_DATA,SAVE_SELECT, ADD_TO_CART,
    REMOVE_FROM_CART,PLUS_LENGTH,MINUS_LENGTH, ADD_COMMENT,
    ADD_RATINNG,CHECK_RATING,ADD_POST_DATA,ADD_POST_TO_CART
    ,REMOVE_POST_FROM_CART } from './types.js';
import axios from 'axios';
import {newsApi,boardgamesApi,searchApi,selectedApi} from '../api/apis'

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
        return axios.get(`http://localhost:8000/api/v1/posts/profile/list/${id}`)
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