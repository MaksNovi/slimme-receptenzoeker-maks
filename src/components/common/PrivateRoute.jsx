import {Navigate} from 'react-router-dom';
import {useAuthContext} from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

function PrivateRoute({children}) {
    const {isAuthenticated} = useAuthContext();

    return isAuthenticated ? children : <Navigate to="/login" replace/>;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateRoute;
