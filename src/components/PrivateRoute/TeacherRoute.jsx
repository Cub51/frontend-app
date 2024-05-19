// Desc: Private route for teacher
import {Redirect, Route} from "react-router-dom";
import PropTypes from 'prop-types';

const TeacherRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Route
        {...rest}
        render={(props) =>
            user && user.role === "teacher" ? (
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

TeacherRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default TeacherRoute;