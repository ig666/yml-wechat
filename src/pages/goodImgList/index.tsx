import { View } from "@tarojs/components";
import { AtGrid } from "taro-ui";
import { useEffect, useState } from "react";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import { request } from "@/utils/request";
import { useRequest } from "taro-hooks";
import "./index.less";

const GoodGroup = () => {
  const route = useRouter();
  const [semesterList, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  //请求类
  const { run } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }) => {
      if (data) {
        data.wechatUserWorkPhotos = data.wechatUserWorkPhotos.map(item => {
          item.image = item.photoUrl;
          item.value = item.photoDescript;
          return item;
        });
        setList([...semesterList, ...data.wechatUserWorkPhotos]);
        if (loading) {
          setLoading(false);
        }
      }
    }
  });
  const getList = id => {
    run(`/good-group/${id}`, "GET", undefined, false);
  };
  //预览模板图片
  const previewTemImage = item => {
    Taro.previewImage({
      current: item.photoUrl,
      urls: [item.photoUrl]
    });
  };
  useDidShow(() => {
    getList(route.params.id);
    setLoading(true);
    setList([]);
  });
  return (
    <View className='img-list'>
      <AtGrid onClick={previewTemImage} data={semesterList} />
    </View>
  );
};

export default GoodGroup;
