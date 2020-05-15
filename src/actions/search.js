import { SET_SEARCH } from '../types/search';

export const setSearch = (search) => {

	return dispatch => {

		dispatch({
			type: SET_SEARCH,
			payload: {
				search
			}
		})

	}

}
