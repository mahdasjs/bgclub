import { ADD_FETCHED_DATA, ADD_FAVORITE_TERM, REMOVE_FAVORITE_TERM,ADD_bg_DATA,ADD_RESULT_DATA,SAVE_SELECT_OPTION } from './types.js';
import axios from 'axios';
const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
export const addFavoriteTerm =  (data) => {
    return {
      type: ADD_FAVORITE_TERM,
      payload: {
        name: data.name,
        description: data.description
      }
    }
};

export const removeFavoriteTerm = name => {
    return {
      type: REMOVE_FAVORITE_TERM,
      payload: {
        name
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
export const saveSelectValue=(data)=> {
    return {
        type: SAVE_SELECT_OPTION,
        payload: data
      }
}