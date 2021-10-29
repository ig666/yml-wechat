import { useState } from "react";
import Taro from "@tarojs/taro";
import { useRequest, useRouter } from "taro-hooks";
import { View } from "@tarojs/components";
import { AtInput, AtButton, AtMessage } from "taro-ui";
import { request } from "@/utils/request";
import "./index.less";

const Login = () => {
  const [, { relaunch }] = useRouter();
  const [form, setVal] = useState({ phone: "", password: "" });
  const { run } = useRequest(request, {
    manual: true,
    onSuccess: ({ data }) => {
      Taro.setStorageSync("token", data.token);
      relaunch("/pages/home/index");
    }
  });
  const toLogin = () => {
    let test = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    if (!form.phone) {
      return Taro.showToast({
        title: "请输入手机号",
        icon: "none"
      });
    }
    if (!form.password) {
      return Taro.showToast({
        title: "请输入密码",
        icon: "none"
      });
    }
    if (!test.test(form.phone)) {
      Taro.showToast({ title: "请检查手机号格式!", icon: "none" });
      return;
    }
    run("/wechat/login", "POST", form);
  };
  return (
    <View className='login'>
      <AtMessage />
      <View className='hello'>HELLO</View>
      <View className='welcome'>欢迎登陆!</View>
      <View className='login-page'>
        <AtInput
          border={false}
          name='phone'
          type='phone'
          placeholder='请输入手机号'
          value={form.phone}
          onChange={(val: string) => {
            setVal(formData => {
              formData.phone = val;
              return formData;
            });
          }}
        />
        <AtInput
          border={false}
          name='password'
          type='password'
          placeholder='请输入密码'
          value={form.password}
          onChange={(val: string) => {
            setVal(formData => {
              formData.password = val;
              return formData;
            });
          }}
        />
        <View className='btn'>
          <AtButton type='primary' onClick={toLogin}>
            登录
          </AtButton>
        </View>
        <View
          onClick={() => {
            Taro.navigateTo({ url: `/pages/intactInfo/index?type=regeist` });
          }}
          className='go-regesit'
        >
          去注册
        </View>
      </View>
    </View>
  );
};

export default Login;
