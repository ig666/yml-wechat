import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import Paysuccess from "@/asstes/images/paysuccess.png";
import "./index.less";

const PaySuccess = () => {
  //方法类
  const backPage = () => {
    Taro.navigateBack();
  };
  return (
    <View className='pay-success'>
      <Image className='pay-image' src={Paysuccess} />
      <View className='text'>支付成功</View>
      <AtButton size='small' className='btn' type='primary' onClick={backPage}>
        返回
      </AtButton>
    </View>
  );
};

export default PaySuccess;
