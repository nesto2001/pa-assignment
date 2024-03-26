import { Card } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import LoginForm from "../components/forms/LoginForm";
import { auth } from "../services/firebaseConfig";

const index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/actual-data");
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="header__logo mb-5 -mt-20 flex items-center">
        <span className="w-[88px] lg:w-[130px] overflow-hidden ">
          <img className="lg:w-[150px] w-[80px]" src={Logo} />
        </span>
        <h1 className="font-bold text-3xl text-body">Phuc An Infotel</h1>
      </div>
      <Card className="w-4/5 lg:w-1/4">
        <h3 className="text-2xl font-bold mb-5 text-center text-body">
          Sign in
        </h3>
        <LoginForm />
      </Card>
    </div>
  );
};

export default index;
