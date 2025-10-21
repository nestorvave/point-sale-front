import React from 'react';

interface Props {
	component: React.ComponentType;
}

const ProtectedRoute = ({ component: RouteComponent }: Props) => {
	/* const navigate = useNavigate(); */

	/* 	useEffect(() => {
		if (!isLogged) {
			navigate(-1);
			
		}
	}, []); */

	return <h1>Nestorine tu puedes</h1>;
};

export default ProtectedRoute;
