import { AtForm, AtInput, AtButton, AtMessage } from "taro-ui";
import { View, Picker } from "@tarojs/components";
import { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { useRouter } from "@tarojs/runtime";
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
    phone: "",
    password: "",
    name: "",
    clinic: "",
    post: "",
    gender: Gender["男"]
  });
  let [checkPassword, setcheck] = useState("");
  let [joinType, setType] = useState("regeist");
  const router = useRouter();
  useDidShow(() => {
    if (router?.params.type === "regeist") {
      setType("regeist");
    } else if (router?.params.type === "update") {
      setType("update");
      run("/wechat/info", "GET");
    }
  });
  //请求类
  const { run, loading } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }, params) => {
      if (params[0] !== "/wechat/info") {
        if (data) {
          Taro.showToast({
            title: data,
            icon: "success",
            duration: 2000
          });
          if (joinType === "update") {
            Taro.navigateBack({ delta: 1 });
          } else {
            Taro.navigateTo({ url: "/pages/login/index" });
          }
        }
      } else {
        setInfo(data);
      }
    }
  });
  //方法类
  const changeGender = val => {
    setInfo({ ...info, gender: parseInt(val.detail.value) === 0 ? 1 : 2 });
  };
  const onSubmit = () => {
    let test = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    if (!info.phone || !test.test(info.phone))
      return Taro.atMessage({
        message: "请检查手机号",
        type: "warning"
      });
    if (!info.password)
      return Taro.atMessage({
        message: "请输入密码",
        type: "warning"
      });
    if (!checkPassword || checkPassword !== info.password)
      return Taro.atMessage({
        message: "请检查两次密码输入是否正确!",
        type: "warning"
      });
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
    run(
      router?.params.type === "regeist"
        ? "/wechat/register"
        : "/wechat/updateWechatUser",
      "POST",
      info,
      false
    );
  };
  return (
    <View className='intact-info'>
      <AtMessage />
      <AtForm>
        <AtInput
          required
          name='phone'
          title='手机号:'
          type='text'
          placeholder='请输入手机号'
          value={info.phone}
          onChange={(val: string) => {
            setInfo(data => {
              data.phone = val;
              return data;
            });
          }}
        />
        <AtInput
          required
          name='password'
          title='密码:'
          type='text'
          placeholder='请输入密码'
          value={info.password}
          onChange={(val: string) => {
            setInfo(data => {
              data.password = val;
              return data;
            });
          }}
        />
        <AtInput
          required
          name='checkPassword'
          title='确认密码:'
          type='text'
          placeholder='请输入确认密码'
          value={checkPassword}
          onChange={(val: string) => {
            setcheck(val);
          }}
        />
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
        {joinType === "regeist" ? "完成注册" : "完成修改"}
      </AtButton>
    </View>
  );
};

export default IntactInfo;
