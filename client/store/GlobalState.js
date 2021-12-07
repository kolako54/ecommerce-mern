import { createContext, useReducer, useEffect } from 'react'
import { getData } from '../db/fetchData';
import reducers from './Reducers';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const initialState = { notify: {}, auth: {}, modal: {}, card: [], orders: [] }
    const [state, dispatch] = useReducer(reducers, initialState);
    const { card, auth } = state


    // login local storage
    useEffect(() => {
        console.log('globalstate')
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            getData('auth/accessToken').then(res => {
                if (res.err) {
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
    }, []);
    // get card item & dispatch
    useEffect(() => {
        const __next__card01__develio = JSON.parse(localStorage.getItem('__next__card01__develio'))
        if (__next__card01__develio) dispatch({ type: 'ADD_CARD', payload: __next__card01__develio });
    }, [])
    // set card item in local storage
    useEffect(() => {
        localStorage.setItem('__next__card01__develio', JSON.stringify(card))
    }, [card])

    useEffect(() => {
        if (auth.token) {
            getData('order', auth.token).then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
                dispatch({ type: 'ADD_ORDERS', payload: res.orders})
            })
        }
    }, [auth.token])
    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}