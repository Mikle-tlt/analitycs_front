import { useUserStore } from '../../../services/stores/user/user-service';
import { Navigate, Outlet } from 'react-router-dom';
import { Role, route } from '../../../constants';

export const AdminRoute = () => {
  const { isAuthenticated, role } = useUserStore();
  const isAdmin = role === Role.ADMIN;

  return isAuthenticated && isAdmin
    ? <Outlet />
    : (
      isAuthenticated && !isAdmin
        ? <Navigate to={route.CLIENTS.MAIN} />
        : <Navigate to={route.LOGIN} />
    );
};