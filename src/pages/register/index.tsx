import { View, ScrollView } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { useRequest } from "taro-hooks";
import NoData from "@/components/noData";
import NoLogin from "@/components/noLogin";
import { AtButton } from "taro-ui";
import { formattYMDHMS } from "@/utils/formDate";
import "./index.less";

const Register = () => {
  //状态类
  const [semesterList, setList] = useState<any[]>([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [pageNation, setPageNation] = useState({
    pageSize: 10,
    pageIndex: 1
  });
  const [total, setTotal] = useState(0);
  //请求类
  const { run, loading } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }) => {
      setList(data.list);
      setTotal(data.total);
    }
  });
  //方法类
  const toSignup = semesrerId => {
    run("/semester/signUp", "POST", { ...pageNation, semesrerId }, false);
  };
  const renderList = () => {
    if (semesterList && semesterList.length <= 0) {
      return <NoData />;
    }
    const list = semesterList.map((item, index) => (
      <View key={index} className='semester-card'>
        <View className='top-info'>
          <View className='name'>
            {item.semesterName}·
            <View className='title'>{item.semesterTitle}</View>
          </View>
          <View className='time'>
            开课时间:{formattYMDHMS(item.classStartTime)}
          </View>
        </View>
        <View className='content'>{item.content}</View>
        <View className='price-signup'>
          <View className='price'>{item.price}￥</View>
          <AtButton
            onClick={() => {
              toSignup(item.id);
            }}
            type='primary'
            className='signup'
            disabled={item.onSignUp}
          >
            {item.onSignUp ? "已报名" : "报名"}
          </AtButton>
        </View>
      </View>
    ));
    if (total === pageNation.pageIndex * pageNation.pageSize) {
      list.push(<View className='no-moredate'>没有更多拉...</View>);
    }
    return list;
  };
  //effect
  useEffect(() => {
    if (!loginStatus) return;
    const getList = parmas => {
      run("/semester", "GET", parmas, false);
    };
    getList(pageNation);
  }, [loginStatus, pageNation, run]);
  useEffect(() => {
    const token = Taro.getStorageSync("token");
    if (token) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);
  return (
    <View className='register'>
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
            if (total <= pageNation.pageIndex * pageNation.pageSize) {
              setPageNation({
                ...pageNation,
                pageIndex: pageNation.pageIndex + 1
              });
            }
          }}
        >
          {renderList()}
        </ScrollView>
      ) : (
        <NoLogin />
      )}
    </View>
  );
};

export default Register;
