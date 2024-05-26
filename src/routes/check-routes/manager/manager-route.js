import { useUserStore } from '../../../services/stores/user/user-service';
import { Navigate, Outlet } from 'react-router-dom';
import { Role, route } from '../../../constants';

export const ManagerRoute = () => {
  const { isAuthenticated, role } = useUserStore();
  const isManager = role === Role.MANAGER;

  return isAuthenticated && isManager
    ? <Outlet />
    : (
      isAuthenticated && !isManager
        ? <Navigate to={route.PROFILES} />
        : <Navigate to={route.LOGIN} />
    );
};