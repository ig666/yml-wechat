import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import "./index.less";

const PaySuccess = () => {
  //方法类
  const backPage = () => {
    Taro.redirectTo({ url: "pages/register/index" });
    };
  return (
    <View className='pay-success'>
      <Image src='@/asstes/images/paysuccess.png' />
      <View>支付成功</View>
      <AtButton onClick={backPage}>返回</AtButton>
    </View>
  );
};

export default PaySuccess;
