import { Image, View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { request } from "@/utils/request";
import { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { useRequest } from "taro-hooks";
import defaultImg from "../../asstes/images/default_head_icon.png";
import "./index.less";

enum Gender {
  "男" = 1, // 男
  "女" = 2 // 女
}
const Mine = () => {
  const [info, setInfo] = useState({
    name: "获取中",
    phone: "获取中",
    post: "获取中",
    clinic: "获取中",
    gender: 1
  });
  //请求类
  const { run } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }) => {
      if (data) {
        setInfo(data);
      }
    }
  });
  useDidShow(() => {
    run("/wechat/info", "GET");
  });
  return (
    <View className='mine'>
      <View className='top-bg'></View>
      <View className='top-user'>
        <Image className='user-heard' src={defaultImg} />
        <View className='user-info'>
          <View className='name'>{info.name}</View>
          <View className='post'>{info.post}</View>
        </View>
      </View>

      <View className='user-list'>
        <AtList hasBorder={false}>
          <AtListItem title='性别' extraText={Gender[info.gender]} />
          <AtListItem title='诊所' extraText={info.clinic} />
          <AtListItem
            className='info-phone'
            title='手机号'
            extraText={info.phone}
          />
        </AtList>
        <AtList hasBorder={false} className='update-info'>
          <AtListItem
            title='修改信息'
            arrow='right'
            onClick={() => {
              Taro.navigateTo({ url: `/pages/intactInfo/index?type=update` });
            }}
          />
        </AtList>
      </View>
    </View>
  );
};

export default Mine;
