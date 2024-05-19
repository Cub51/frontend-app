// Desc: Private route for admin
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    return (
        <Route
        {...rest}
        render={(props) =>
            user && user.role === "Administrador" ? (
            <Component {...props} />
            ) : (
            <Redirect to={{pathname: "/login",
                            state: {from: location}
                        }} />
            )
        }
        />
    );
}

AdminRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};
    export default AdminRoute;