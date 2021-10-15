import { useState, useContext, useEffect } from "react";
import fb from "./../fb";
import { AuthContext } from "../navigation/AuthProvider";

export default (isFocused) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isOwner: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = fb.database().ref().child(`users/${user.uid}`);

  useEffect(() => {
    const abortCont = new AbortController();
    userInfo
      .once("value", function (snapshot) {
        const { firstName, lastName, email, isOwner } = snapshot.val();
        setUserData({
          firstName,
          lastName,
          email,
          isOwner,
        });
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
    return () => abortCont.abort();
  }, [isFocused]);

  return { userData, loading, error };
};
