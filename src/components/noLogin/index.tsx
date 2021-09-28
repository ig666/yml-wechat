import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import NoAuthPng from "@/asstes/images/noAuth.png";
import "./index.less";

const NoLogin = () => {
  const goLogin = () => {
    Taro.redirectTo({
      url: "/pages/login/index"
    });
  };
  return (
    <View className='no-login'>
      <Image className='no-auth-image' src={NoAuthPng} />
      <View className='text'>您还没有登录，请登录后查看</View>
      <AtButton onClick={goLogin} type='primary' className='goLogin'>
        登录
      </AtButton>
    </View>
  );
};

export default NoLogin;
