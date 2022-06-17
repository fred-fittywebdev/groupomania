import React from 'react'
import { useSelector } from 'react-redux'
import Redirect from './Redirect'

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state.auth }))
    return user ? children : <Redirect />
    return (
        <div>PrivateRoute</div>
    )
}

export default PrivateRoute