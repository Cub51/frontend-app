// Desc: Private route for student
import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

const StudentRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Route
        {...rest}
        render={(props) =>
            user && user.role === "student" ? (
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

StudentRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};
export default StudentRoute;