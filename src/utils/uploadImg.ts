/*
 * @Author: Qi.Chen
 * @Date: 2021-10-28 21:44:06
 * @LastEditTime: 2021-10-31 16:21:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yml-wechat\src\utils\uploadImg.ts
 */
import Taro from "@tarojs/taro";
import { File } from "taro-ui/types/image-picker";

export const uploadImg = async (file: File): Promise<string> => {
  let token = Taro.getStorageSync("token")
    ? "bearer " + Taro.getStorageSync("token")
    : undefined;
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      header: token
        ? {
            Authorization: token
          }
        : undefined,
      url: "https://yameila.vip/node-serve/alioss/wechat-upload",
      filePath: file.url,
      name: "wechatWork",
      success: res => {
        let data = JSON.parse(res.data);
        if (data.code != 0) {
          Taro.showToast({ title: "上传失败", icon: "none" });
          return;
        }
        resolve(data.data.url);
      },
      fail: err => {
        Taro.showToast({ title: "上传失败", icon: "none" });
        reject(err);
      }
    });
  });
};
