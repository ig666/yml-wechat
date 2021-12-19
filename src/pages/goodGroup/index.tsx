import { View, ScrollView } from "@tarojs/components";
import { AtCard } from "taro-ui";
import { useEffect, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { request } from "@/utils/request";
import { useRequest } from "taro-hooks";
import NoData from "@/components/noData";
import "./index.less";

const GoodGroup = () => {
  const [semesterList, setList] = useState<any[]>([]);
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
    onSuccess: ({ data }) => {
      if (data) {
        setList([...semesterList, ...data.list]);
        setTotal(data.total);
        if (loading) {
          setLoading(false);
        }
      }
    }
  });
  const renderList = () => {
    if (semesterList && semesterList.length <= 0) {
      return <NoData />;
    }
    const list = semesterList.map((item, index) => (
      <>
        <View className='divider'></View>
        <View key={index} className='semester-card'>
          <AtCard
            extra={`照片数:${item.wechatUserWorkPhotos.length}`}
            title={item.groupName}
            onClick={() => {
              Taro.navigateTo({url:`/pages/goodImgList/index?id=${item.id}`});
            }}
          >
            {item.groupDescript}
          </AtCard>
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
    const getList = parmas => {
      run("/good-group", "GET", parmas, false);
    };
    getList(pageNation);
  }, [pageNation]);
  useDidShow(() => {
    setLoading(true);
    setList([]);
    setPageNation({
      pageSize: 10,
      pageIndex: 1
    });
  });
  return (
    <View className='good-group'>
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
    </View>
  );
};

export default GoodGroup;
