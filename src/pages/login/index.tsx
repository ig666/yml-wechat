import Taro from "@tarojs/taro";
import { useState } from "react";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import LoginPage from "./components/loginPage";
import "./index.less";

type status = "normal" | "login" | "register";
const Login = () => {
  const [loginStatus, setLoginStatus] = useState<status>("normal");
  const loginContent = () => {
    if (loginStatus === "normal") {
      return (
        <>
          <AtButton type='primary' onClick={() => setLoginStatus("login")}>
            手机号登录
          </AtButton>
          <AtButton
            type='secondary'
            onClick={() => {
              Taro.navigateTo({ url: `/pages/intactInfo/index?type=regeist` });
            }}
          >
            注册
          </AtButton>
        </>
      );
    } else if (loginStatus === "login") {
      return <LoginPage goLogin={setLoginStatus} />;
    }
  };
  return <View className='login'>{loginContent()}</View>;
};

export default Login;
