import { AtForm, AtInput, AtButton, AtMessage } from "taro-ui";
import { View, Picker } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { useRequest } from "taro-hooks";
import "./index.less";

enum Gender {
  "男" = 1, // 男
  "女" = 2 // 女
}

const IntactInfo = () => {
  const selector = ["男", "女"];
  const [info, setInfo] = useState({
    id: "a8f88b67-1c4d-4f8a-8014-6f312fd34501",
    name: "",
    clinic: "",
    post: "",
    gender: Gender["男"]
  });
  //请求类
  const { run, loading } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }) => {
      if (data) {
        Taro.showToast({
          title: data,
          icon: "success",
          duration: 2000
        });
        Taro.navigateBack({ delta: 1 });
      }
    }
  });
  //方法类
  const changeGender = val => {
    setInfo({ ...info, gender: parseInt(val.detail.value) === 0 ? 1 : 2 });
  };
  const onSubmit = () => {
    if (!info.name)
      return Taro.atMessage({
        message: "请输入姓名",
        type: "warning"
      });
    if (!info.clinic)
      return Taro.atMessage({
        message: "请输入诊所",
        type: "warning"
      });
    if (!info.post)
      return Taro.atMessage({
        message: "请输入职务",
        type: "warning"
      });
    run("/wechat/updateWechatUser", "POST", info, false);
  };
  return (
    <View className='intact-info'>
      <AtMessage />
      <AtForm>
        <AtInput
          required
          name='name'
          title='姓名:'
          type='text'
          placeholder='请输入姓名'
          value={info.name}
          onChange={(val: string) => {
            setInfo(data => {
              data.name = val;
              return data;
            });
          }}
        />
        <Picker mode='selector' range={selector} onChange={changeGender}>
          <AtInput
            className='choose-gender'
            required
            editable={false}
            name='gender'
            title='性别:'
            type='text'
            placeholder='请选择性别'
            value={Gender[info.gender]}
            onChange={() => {}}
          />
        </Picker>
        <AtInput
          required
          name='clinic'
          title='诊所:'
          type='text'
          placeholder='请输入诊所名称'
          value={info.clinic}
          onChange={(val: string) => {
            setInfo(data => {
              data.clinic = val;
              return data;
            });
          }}
        />
        <AtInput
          required
          name='post'
          title='职务:'
          type='text'
          placeholder='请输入职务'
          value={info.post}
          onChange={(val: string) => {
            setInfo(data => {
              data.post = val;
              return data;
            });
          }}
        />
      </AtForm>
      <AtButton
        loading={loading}
        onClick={onSubmit}
        type='primary'
        className='submit'
      >
        完善资料
      </AtButton>
    </View>
  );
};

export default IntactInfo;
