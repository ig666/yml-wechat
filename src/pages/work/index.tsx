import { View, ScrollView } from "@tarojs/components";
import { useEffect, useState, useRef } from "react";
import Taro from "@tarojs/taro";
import NoLogin from "@/components/noLogin";
import { request } from "@/utils/request";
import { useRequest } from "taro-hooks";
import "./index.less";

const Work = () => {
  //请求类
  const { run, loading } = useRequest(request, {
    throttleInterval: 500,
    manual: true,
    onSuccess: ({ data }) => {
      setTotal(10);
    }
  });
  //状态类
  const [loginStatus, setLoginStatus] = useState(false);
  const [pageNation, setPageNation] = useState({
    pageSize: 10,
    pageIndex: 1
  });
  const [total, setTotal] = useState(0);
  //useEffect
  useEffect(() => {
    const token = Taro.getStorageSync("token");
    if (token) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);
  useEffect(() => {
    if (!loginStatus) return;
    const getList = parmas => {
      run("/account/getListByPage", "GET", parmas, false);
    };
    getList(pageNation);
  }, [loginStatus, pageNation, run]);
  //方法类
  return (
    <View className='work'>
      {loginStatus ? (
        <ScrollView
          className='scrollview'
          scrollY
          scrollAnchoring
          refresher-enabled
          refresher-threshold={100}
          refresher-default-style='black'
          refresher-triggered={loading}
          onRefresherRefresh={() => {
            setPageNation({
              pageSize: 10,
              pageIndex: 1
            });
          }}
          onScrollToLower={() => {
            setPageNation({
              ...pageNation,
              pageIndex: pageNation.pageIndex + 1
            });
          }}
        >
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
          <View>A</View>
          <View>B</View>
          <View>C</View>
        </ScrollView>
      ) : (
        <NoLogin />
      )}
    </View>
  );
};

export default Work;
