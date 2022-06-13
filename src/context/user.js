import { createContext, useReducer } from "react";

export const UserContext = createContext()

const initialState = {
    isLogin: false,
    isAdmin: false,
    user: {},
    productCount: 0
}

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token);
            localStorage.setItem('productCount', 0);
            return {
                isLogin: true,
                user: payload,
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                isLogin: false,
                user: {},
            };
        default:
            throw new Error();
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState) // proses useReducer

    // proses create context
    return (
        <UserContext.Provider value={[state, dispatch]} >
            {children}
        </UserContext.Provider>
    )
}