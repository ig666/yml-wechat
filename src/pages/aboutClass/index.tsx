import { View } from "@tarojs/components";
import { AtCard } from "taro-ui";
import "./index.less";

const AboutClass = () => {
  return (
    <View className='about-class'>
      <AtCard
        note='已报名人数(微信学员)'
        extra='价格'
        title='学期名称'
        thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
      >
        这是内容
      </AtCard>
    </View>
  );
};

export default AboutClass;
