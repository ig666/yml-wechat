import { useCallback } from "react";
import { View } from "@tarojs/components";
import { useLogin, useRouter } from "taro-hooks";
import { AtButton } from "taro-ui";
import "./index.less";

const Login = () => {
  const [info, { relaunch }] = useRouter();
  const [login, checkLogin] = useLogin();
  const loginIn = useCallback(() => {
    login(true)
      .then((code: string) => {
        console.log("code", code);
      })
      .catch(err => {
        console.log("获取失败", err);
      });
  }, [login]);
  return (
    <View className='login'>
      <AtButton type='primary' onClick={loginIn}>
        手机号一键登录
      </AtButton>
    </View>
  );
};

export default Login;
