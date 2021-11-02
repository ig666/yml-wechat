import { Image, View } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton
} from "taro-ui";
import { request } from "@/utils/request";
import { formattYMD } from "@/utils/formDate";
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
  const [semesters, setSemesters] = useState([]);
  const [isOpened, setisOpened] = useState(false);
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
  const { run: getSemester } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }) => {
      if (data) {
        setSemesters(data.semesters);
      }
    }
  });
  useDidShow(() => {
    run("/wechat/info", "GET");
    getSemester("/wechat/getWechatSemesters", "GET");
  });
  //方法类
  const onShowSemester = () => {
    setisOpened(true);
  };
  const renderSemesterList = () => {
    let semesTerList = semesters.map((item: any, index) => {
      return (
        <View key={index} className='semester-item'>
          <View>学期名称：{item.semesterName}</View>
          <View>开课时间:{formattYMD(item.createTime)}</View>
        </View>
      );
    });
    return semesTerList;
  };
  return (
    <View className='mine'>
      <AtModal
        isOpened={isOpened}
        onClose={() => {
          setisOpened(false);
        }}
      >
        <AtModalHeader>已报名学期</AtModalHeader>
        <AtModalContent>{renderSemesterList()}</AtModalContent>
        <AtModalAction>
          <AtButton
            size='small'
            className='ok-btn'
            type='primary'
            onClick={() => {
              setisOpened(false);
            }}
          >
            确认
          </AtButton>
        </AtModalAction>
      </AtModal>
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
          {semesters.length > 0 ? (
            <AtListItem title='查看学期' onClick={onShowSemester} />
          ) : (
            ""
          )}
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
