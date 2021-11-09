import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.less";

const Home = () => {
  const openId = () => {
    Taro.login({
      success: function(res) {
        if (res.code) {
          console.log(res.code, "参数");
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  };
  return (
    <View className='home'>
      <Image
        className='devlping'
        src='https://yameila.oss-cn-beijing.aliyuncs.com/home/62474-developing.gif'
      ></Image>
      <View className='dev-name'>暂未开放...</View>
      {/* <AtButton onClick={openId}>生成openid</AtButton> */}
    </View>
  );
};

export default Home;
