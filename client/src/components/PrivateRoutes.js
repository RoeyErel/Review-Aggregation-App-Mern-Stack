import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = localStorage.getItem('username')
    return (
        auth? <Outlet/> : <Navigate to='/login'/>
    )
}


export default PrivateRoutes
