import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: PropsWithChildren) {
	// Check auth
	// @ts-expect-error
	if (window.node.authenticated === false) {
		return <Navigate to={{ pathname: '/login', search: window.location.search }} replace />;
	}

	return <>{children}</>;
}
