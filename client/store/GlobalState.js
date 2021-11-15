import { createContext, useReducer, useEffect } from 'react'
import { getData } from '../db/fetchData';
import reducers from './Reducers';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    useEffect(() => {
        console.log('globalstate')
        const firstLogin = localStorage.getItem('firstLogin');
        console.log(firstLogin);
        if (firstLogin) {
            console.log('inside if')
            getData('auth/accessToken').then(res => {
                console.log(res)
                if (res.err) {
                    console.log('inside error')
                    return localStorage.removeItem('firstLogin')
                };
                dispatch({
                    type: 'AUTH',
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            });
        }
    }, [])
    const initialState = { notify: {}, auth: {} }
    const [state, dispatch] = useReducer(reducers, initialState);
    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}