import { SET_SEARCH } from '../types/search';

const initState = {
	search: ''
}

export default (state = initState, action) => {

	switch(action.type) {
		case SET_SEARCH :
			return {...state, search: action.payload.search}
		default :
			return state
	}

}
