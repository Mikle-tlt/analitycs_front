import { useUserStore } from '../../../services/stores/user/user-service';
import { Navigate, Outlet } from 'react-router-dom';
import { route } from '../../../constants';

export const UnAuthenticatedRoute = () => {
  const { isAuthenticated } = useUserStore();
  return !isAuthenticated
    ? <Outlet />
    : <Navigate to={route.CLIENTS.MAIN} replace />;
};