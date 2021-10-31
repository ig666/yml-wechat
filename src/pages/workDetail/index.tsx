import { View, Image } from "@tarojs/components";
import Taro, { getCurrentPages } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtImagePicker, AtButton } from "taro-ui";
import { File } from "taro-ui/types/image-picker";
import { useRequest } from "taro-hooks";
import { request } from "@/utils/request";
import { uploadImg } from "@/utils/uploadImg";
import "./index.less";

enum WorkStatus {
  publish = 1, // 已发布
  complete = 2, // 已提交
  pass = 3, // 及格
  flunk = 4 // 不及格
}

enum WorkStatusBtn {
  "提交" = 1, // 已发布
  "返回" = 2, // 已提交
  "返回 " = 3, // 及格
  "补考" = 4 // 不及格
}

interface WorkDetail {
  id: string; // ts严格模式下添加非空断言 "!"
  // 作业模板id
  homeWorkId: string;
  // 作业描述
  describe: string;
  // 作业状态
  status: WorkStatus;
  // 备注
  remark: string;
  // 对应作业图片实体数组
  wechatUserWorkPhotos: any;
  // 对应学员作业id
  wechatUser: any;
  // 对应学期
  semester: any;
  createTime: Date;
  updateTime: Date;
}
const WorkDetail = () => {
  //请求类
  const { run, loading } = useRequest(request, {
    manual: true,
    debounceInterval: 500,
    onSuccess: ({ data }) => {
      if (data) {
        Taro.showToast({ title: "上传成功" });
        Taro.navigateBack();
      }
    }
  });

  //状态类
  const [workDetail, setDetail] = useState<WorkDetail | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  //useEffect
  useEffect(() => {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();
    eventChannel.on("workDetail", ({ data }) => {
      setDetail(data);
    });
  }, []);
  //方法类

  //预览模板图片
  const previewTemImage = index => {
    Taro.previewImage({
      current: workDetail?.wechatUserWorkPhotos[index].photoUrl,
      urls: workDetail?.wechatUserWorkPhotos.map(item => item.photoUrl)
    });
  };
  const renderWorkTemp = () => {
    let temList;
    temList = workDetail?.wechatUserWorkPhotos.map((item: any, index) => {
      return (
        <View key={index} className='item-mask'>
          <Image
            onClick={() => {
              previewTemImage(index);
            }}
            className='tem-item'
            src={item.photoUrl}
          />
          {item.photoDescript ? (
            <View className='mask'>{item.photoDescript}</View>
          ) : (
            ""
          )}
        </View>
      );
    });
    return (
      <View className='tem-content'>
        <View className='title'>
          {workDetail?.status === 1 ? "模板示例" : "作业详情"}
        </View>
        <View className='tem-list'>
          {temList}
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
      </View>
    );
  };
  const renderWork = () => {
    if (workDetail?.status === 1 || workDetail?.status === 4) {
      return (
        <View className='work-content'>
          <View className='title'>提交作业</View>
          <AtImagePicker
            multiple
            count={workDetail?.wechatUserWorkPhotos.length}
            files={files}
            onChange={file => {
              if (
                files.length + files.length >
                workDetail!.wechatUserWorkPhotos.length
              ) {
                return Taro.showToast({
                  title: "不可超过模板数",
                  icon: "none"
                });
              }
              setFiles(file);
            }}
            onFail={fail => {
              console.log(fail);
            }}
            onImageClick={index => {
              Taro.previewImage({
                current: files[index].url,
                urls: files.map(item => item.url)
              });
            }}
          />
        </View>
      );
    }
  };
  //提交作业
  const submitWork = async (status: number) => {
    if (files.length <= 0)
      return Taro.showToast({ title: "至少选择一张图片", icon: "none" });
    let uploadErr = false;
    let fileUrls: string[] = [];
    Taro.showLoading({ title: "上传中" });
    for (let file of files) {
      let url = await uploadImg(file);
      if (url) {
        fileUrls.push(url);
      } else {
        uploadErr = true;
      }
    }
    Taro.hideLoading();
    if (!uploadErr) {
      workDetail!.status = 2;
      fileUrls.map((item, index) => {
        workDetail!.wechatUserWorkPhotos[index].photoUrl = item;
      });
      run("/wechat-user-work", "PUT", workDetail);
    } else {
      Taro.showToast({ title: "上传失败", icon: "none" });
    }
  };
  const toOk = async () => {
    if (workDetail?.status === 2 || workDetail?.status === 3) {
      Taro.navigateBack();
    } else if (workDetail?.status === 1 || workDetail?.status === 4) {
      submitWork(2);
    }
  };
  return (
    <View className='work-detail'>
      {renderWorkTemp()}
      {renderWork()}
      <AtButton
        loading={loading}
        onClick={() => {
          toOk();
        }}
        className='work-btn'
        type='primary'
      >
        {WorkStatusBtn[workDetail?.status || 1]}
      </AtButton>
    </View>
  );
};

export default WorkDetail;
