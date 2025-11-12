import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../App";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const { refreshUser } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      refreshUser().then(() => navigate("/"));
    } else {
      navigate("/signin");
    }
  }, [navigate, refreshUser]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;
