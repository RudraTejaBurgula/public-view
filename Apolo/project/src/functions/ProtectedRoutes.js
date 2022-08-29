import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
const ProctectedRoutes = ({ basketCount }) => {
    useEffect(() => {
        console.log(basketCount, basketCount.length !== 0);
    }, [basketCount]);
    return basketCount.length !== 0 ? <Outlet /> : <Navigate to="/SignUp" replace='true' />;
};

export default ProctectedRoutes 