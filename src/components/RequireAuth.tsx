import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import node from '../services/node';

export default function RequireAuth({ children }: PropsWithChildren) {
	if (node.authenticated === false) {
		return <Navigate to={{ pathname: '/login', search: window.location.search }} replace />;
	}

	return <>{children}</>;
}
