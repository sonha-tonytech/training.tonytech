import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getUserProfile} from "redux/actions/authActions"

const withAuth = (Component) => {
  return (props) => {
    const [isReady, setReady] = useState(false);
    const token = useSelector((reducer)=> reducer.authReducer.token);
    const dispatch = useDispatch();

    const check = async () => {
      dispatch(getUserProfile());
      setReady(true);
    };

    useEffect(() => {
      check();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isReady && !token) {
      return <Navigate to="/login" />;
    }

    return isReady ? <Component {...props} /> : <p>Loadng...</p>;
  };
};

export default withAuth;
