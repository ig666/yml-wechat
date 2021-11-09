import { View, ScrollView } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { useRequest } from "taro-hooks";
import NoData from "@/components/noData";
import NoLogin from "@/components/noLogin";
import { AtButton } from "taro-ui";
import { formattYMDHM } from "@/utils/formDate";
import "./index.less";

const Register = () => {
  //状态类
  const [semesterList, setList] = useState<any[]>([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNation, setPageNation] = useState({
    pageSize: 10,
    pageIndex: 1
  });
  const [total, setTotal] = useState(0);
  //请求类
  const { run } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }, parmas) => {
      if (data) {
        if (parmas[0] === "/semester") {
          setList([...semesterList, ...data.list]);
          setTotal(data.total);
          if (loading) {
            setLoading(false);
          }
        } else if (parmas[0] === "/wechat/payJsapi") {
          Taro.requestPayment({
            ...data,
            success: (res) => {
              console.log(res, '支付成功');
              // Taro.showToast({ title: data, icon: "success", duration: 2000 });
              // setList([]);
              // setLoading(true);
              // setPageNation({
              //   pageSize: 10,
              //   pageIndex: 1
              // });
            },
            fail: (res) => {
              console.log(res,'支付失败');
            }
          })
        }
      }
    }
  });
  //方法类
  const toSignup = (semesterId, price, description) => {
    Taro.login({
      success: res => {
        if (res.code) {
          run(
            "/wechat/payJsapi",
            "POST",
            {
              semesterId,
              code: res.code,
              total: price,
              description: description
            },
            false
          );
        } else {
          Taro.showToast({ title: "获取code失败!" });
        }
      }
    });
  };
  const renderList = () => {
    if (semesterList && semesterList.length <= 0) {
      return <NoData />;
    }
    const list = semesterList.map((item, index) => (
      <>
        <View className='divider'></View>
        <View key={index} className='semester-card'>
          <View className='top-info'>
            <View className='name'>
              {item.semesterName}·
              <View className='title'>{item.semesterTitle}</View>
            </View>
            <View className='time'>
              开课时间:{formattYMDHM(item.classStartTime)}
            </View>
          </View>
          <View className='content'>{item.content}</View>
          <View className='price-signup'>
            <View className='price'>{item.price}￥</View>
            <AtButton
              onClick={() => {
                toSignup(item.id, item.price, item.semesterName);
              }}
              type='primary'
              className='signup'
              disabled={item.onSignUp}
            >
              {item.onSignUp ? "已报名" : "报名"}
            </AtButton>
          </View>
        </View>
      </>
    ));
    if (total < pageNation.pageIndex * pageNation.pageSize) {
      list.push(<View className='no-moredate'>没有更多啦...</View>);
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
  }, [loginStatus, pageNation]);
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
          refresher-threshold={80}
          refresher-default-style='black'
          refresher-triggered={loading}
          onRefresherRefresh={() => {
            setLoading(true);
            setList([]);
            setPageNation({
              pageSize: 10,
              pageIndex: 1
            });
          }}
          onScrollToLower={() => {
            if (total >= pageNation.pageIndex * pageNation.pageSize) {
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
