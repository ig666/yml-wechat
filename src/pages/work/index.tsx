import { View, ScrollView, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { request } from "@/utils/request";
import { AtButton } from "taro-ui";
import { useRequest } from "taro-hooks";
import NoData from "@/components/noData";
import NoLogin from "@/components/noLogin";
import { formattYMDHMS } from "@/utils/formDate";
import "./index.less";

enum WorkStatus {
  已发布 = 1, // 已发布
  已提交 = 2, // 已提交
  及格 = 3, // 及格
  不及格 = 4 // 不及格
}
enum WorkStatusColors {
  "#18D0CC" = 1,
  "#3A74F2" = 2,
  "#6AD038" = 3,
  "#FA5D5D" = 4
}
const Work = () => {
  //状态类
  const [workList, setList] = useState<any[]>([]);
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
        if (parmas[0] === "/wechat-user-work") {
          setList([...workList, ...data.list]);
          setTotal(data.total);
          if (loading) {
            setLoading(false);
          }
        }
      }
    }
  });
  //方法类
  const renderList = () => {
    if (workList && workList.length <= 0) {
      return <NoData />;
    }
    const list = workList.map((item, index) => (
      <>
        <View className='divider'></View>
        <View key={index} className='work-card'>
          <View className='work-title'>
            <View className='semester-name'>
              所属学期:{item.semester.semesterName}
            </View>
            <View className='time'>
              发布时间:{formattYMDHMS(item.createTime)}
            </View>
          </View>
          <View className='describe'>{item.describe}</View>
          <View className='work-image-list'>
            {item.wechatUserWorkPhotos
              .slice(0, 3)
              .map((wechatUserWorkPhoto, inde) => (
                <Image
                  lazyLoad
                  className='work-image'
                  key={inde}
                  src={wechatUserWorkPhoto.photoUrl}
                />
              ))}
            {item.wechatUserWorkPhotos.length > 3 ? (
              <View className='beyond-length'>{`+${item.wechatUserWorkPhotos
                .length - 3}`}</View>
            ) : (
              ""
            )}

            {/* 占位元素 */}
            <View className='diver'></View>
            <View className='diver'></View>
            <View className='diver'></View>
            <View className='diver'></View>
            <View className='diver'></View>
            <View className='diver'></View>
            <View className='diver'></View>
          </View>
          <View className='work-bottom'>
            <View
              className='status'
              style={{ color: WorkStatusColors[item.status] }}
            >
              {WorkStatus[item.status]}
            </View>
            <AtButton
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/workDetail/index",
                  success: res => {
                    res.eventChannel.emit("workDetail", { data: item });
                  }
                });
              }}
              type='secondary'
              size='small'
              className='see-work'
            >
              查看
            </AtButton>
          </View>
          {item.remark ? (
            <View className='remark'>
              备注：<View className='remark-item'>{item.remark}</View>
            </View>
          ) : (
            ""
          )}
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
      run("/wechat-user-work", "GET", parmas, false);
    };
    let params = {
      ...pageNation,
      sourceType: "h5"
    };
    getList(params);
  }, [loginStatus, pageNation]);
  useDidShow(() => {
    setLoading(true);
    setList([]);
    setPageNation({
      pageSize: 10,
      pageIndex: 1
    });
  });
  return (
    <View className='work'>
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

export default Work;
