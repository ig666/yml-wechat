import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import NoLogin from "@/components/noLogin";
import "./index.less";

const Register = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    const token = Taro.getStorageSync("token");
    if (token) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);
  return <View className='register'>{loginStatus ? "报名中心" : <NoLogin />}</View>;
};

export default Register;
