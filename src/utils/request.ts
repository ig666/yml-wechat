import Taro from "@tarojs/taro";

export const request = (url, method, params?, showLoading = true) => {
  return new Promise((resolve, reject) => {
    let token = Taro.getStorageSync("token")
      ? "bearer " + Taro.getStorageSync("token")
      : undefined;
    showLoading &&
      Taro.showLoading({
        title: "加载中"
      });
    Taro.request({
      header: token
        ? {
            Authorization: token
          }
        : undefined,
      url: "https://yameila.vip/api" + url, //开发者服务器接口地址",
      data: params, //请求的参数",
      method: method,
      dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: ({ data }) => {
        showLoading && Taro.hideLoading();
        if (data.code === 401) {
          Taro.showToast({
            title: "登陆过期",
            icon: "none",
            duration: 3000
          });
          Taro.removeStorageSync("token");
          Taro.reLaunch({
            url: "/pages/login/index"
          });
          return;
        }
        if (data.code !== 0) {
          Taro.showToast({
            title: data.message,
            icon: "none",
            duration: 3000
          });
          reject(data);
          return;
        } else {
          resolve(data);
        }
      },
      fail: res => {
        showLoading && Taro.hideLoading();
        reject(res);
        Taro.showToast({
          title: "网络错误",
          icon: "none",
          duration: 3000
        });
      }
    });
  });
};
