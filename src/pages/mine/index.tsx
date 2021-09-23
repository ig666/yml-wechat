import {Image, View} from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui"
import defaultImg from '../../asstes/images/default_head_icon.png'
import "./index.less";

const Mine = () => {
  return (
    <View className='mine'>
      <View className='top-bg'></View>
      <View className='top-user'>
        <Image className='user-heard' src={defaultImg} />
        <View className='user-info'>
          <View className='name'>孙其平</View>
          <View className='post'>主治医生</View>
        </View>
      </View>

      <View className='user-list'>
        <AtList hasBorder={false}>
          <AtListItem title='性别' extraText='男'  />
          <AtListItem title='诊所' extraText='老鼠口腔'  />
          <AtListItem title='手机号' extraText='详细信息' />
        </AtList>
      </View>
    </View>
  )
};

export default Mine;
