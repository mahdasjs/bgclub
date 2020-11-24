import { ADD_FETCHED_DATA, 
    ADD_bg_DATA,ADD_RESULT_DATA,SAVE_SELECT, ADD_TO_CART,REMOVE_FROM_CART,PLUS_LENGTH,MINUS_LENGTH, ADD_COMMENT } from './types.js';
import axios from 'axios';


export const removeFromCart = (id) => {
    return {
      type: REMOVE_FROM_CART,
      payload: {
          id
      }
    }
}

export const fetchData = () => {
    return (dispatch) => {
        return axios.get('https://5faaa726b5c645001602af7e.mockapi.io/api/v1/News')
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
        return axios.get('https://5faaa726b5c645001602af7e.mockapi.io/api/v1/Boardgames')
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
export const resultData = (entry) => {
    return (dispatch) => {
        return axios.get('https://5faaa726b5c645001602af7e.mockapi.io/api/v1/Boardgames?name='+entry)
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
        return axios.get('https://5faaa726b5c645001602af7e.mockapi.io/api/v1/Boardgames/'+id)
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
export const addComment =  (data) => {
    return {
      type: ADD_COMMENT,
      payload: data
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