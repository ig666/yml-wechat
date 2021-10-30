import { View, Image } from "@tarojs/components";
import "./index.less";

const Home = () => {
  return (
    <View className='home'>
      <Image className='devlping' src='https://yameila.oss-cn-beijing.aliyuncs.com/home/62474-developing.gif'></Image>
      <View className='dev-name'>暂未开放...</View>
    </View>
  );
};

export default Home;
