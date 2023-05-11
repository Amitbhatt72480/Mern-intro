import {useAuthContext} from './useAuthContext'

export const useLogout = () =>{

	const {dispatch} = useAuthContext()

	const logout = () =>{
		// Delete JWT from local storage and remove user from global state
		localStorage.removeItem('user')

		dispatch({type: 'LOGOUT'})

	}

	return {logout}
}