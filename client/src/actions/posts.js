import * as api from '../api';

// Action creator
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data }); 
    } catch (error) {
        dispatch({ type: 'FETCH_ALL_ERROR', payload: error.message });
    }
}

export const createPost = (post) => async (dispatch)=>{
    try {
       const { data }= await api.createPost(post)
       
       dispatch({type: 'CREATE', payload: data})
    } catch(error) {
        dispatch({ type: 'CREATE_ERROR', payload: error.message });        
    }
}

export const updatePost = (id, post) => async(dispatch)=>{
    try{
        const {data} = await api.updatePost(id, post)
    dispatch({type: 'UPDATE', payload: data})
    }catch(error){
        dispatch({ type: 'UPDATE_ERROR', payload: error.message });
    }
}

export const deletePost = (id) => async(dispatch)=>{
    try{
        await api.deletePost(id)
    dispatch({type: 'DELETE', payload: id})
    }catch(error){
        dispatch({ type: 'DELETE_ERROR', payload: error.message });
    }
}

export const likePost = (id) => async(dispatch)=>{
    try{
        const {data} = await api.likePost(id)
    dispatch({type: 'LIKE', payload: data})
    }catch(error){
        dispatch({ type: 'LIKE_ERROR', payload: error.message });
    }
}
