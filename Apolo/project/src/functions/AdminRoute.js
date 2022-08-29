import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
const Adminroute = ({ adminCount }) => {
    useEffect(() => {
        console.log(adminCount, adminCount.length !== 0);
    }, [adminCount]);
    return adminCount.length !== 0 ? <Outlet /> : <Navigate to="/Login" replace='true' />;
};

export default Adminroute 