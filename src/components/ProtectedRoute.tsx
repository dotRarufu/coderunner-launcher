import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectPath: string;
};

const ProtectedRoute = ({ isAllowed, redirectPath, children }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
