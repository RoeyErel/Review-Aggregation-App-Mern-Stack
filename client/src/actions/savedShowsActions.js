import axios from 'axios';

export const FETCH_SAVED_SHOWS_REQUEST = 'FETCH_SAVED_SHOWS_REQUEST';
export const FETCH_SAVED_SHOWS_SUCCESS = 'FETCH_SAVED_SHOWS_SUCCESS';
export const FETCH_SAVED_SHOWS_FAILURE = 'FETCH_SAVED_SHOWS_FAILURE';
export const TOGGLE_SAVED_SHOW = 'TOGGLE_SAVED_SHOW';

export const fetchSavedShows = () => async (dispatch) => {
    dispatch({ type: FETCH_SAVED_SHOWS_REQUEST });
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/users/getSavedShow`, { withCredentials: true });
        dispatch({ type: FETCH_SAVED_SHOWS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SAVED_SHOWS_FAILURE, payload: error.message });
    }
};

export const toggleSavedShow = (showData) => async (dispatch, getState) => {
    const { savedShows } = getState().savedShows;
    const isSaved = savedShows.some((show) => show.id === showData.id);

    try {
        if (isSaved) {
        await axios.delete(`${process.env.REACT_APP_API_BASE}/api/users/${localStorage.getItem('ID')}/savedShow`, { data: { id: showData.id } });
        } else {
        await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/savedShow`, showData);
        }
        dispatch({ type: TOGGLE_SAVED_SHOW, payload: showData });
    } catch (error) {
        console.error('Error toggling saved show:', error);
    }
};
