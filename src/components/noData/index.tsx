import { View, Image } from "@tarojs/components";
import NoDataImg from "@/asstes/images/noStore.png";
import "./index.less";

const NoData = () => {
  return (
    <View className='no-data'>
      <Image className='no-data-image' src={NoDataImg} />
      <View className='text'>暂无数据</View>
    </View>
  );
};

export default NoData;
