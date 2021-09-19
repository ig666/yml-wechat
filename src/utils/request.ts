import Taro from "@tarojs/taro";

export const request = (url, data, method) => {
  return new Promise((resolve, reject) => {
    let token = "bearer " + Taro.getStorageSync("token");
    Taro.showLoading({
      title: "加载中"
    });
    Taro.request({
      header: {
        Authorization: token
      },
      url: "http://localhost:8080/" + url, //开发者服务器接口地址",
      data: data, //请求的参数",
      method: method,
      dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
        Taro.hideLoading();
        if (res.statusCode === 401) {
          Taro.redirectTo({
            url: "pages/login/index"
          });
          return;
        }
        if (res.statusCode !== 200) {
          Taro.showToast({
            title: res.data.error,
            icon: "none",
            duration: 3000
          });
          return;
        } else {
          resolve(res.data);
        }
      },
      fail: res => {
        Taro.hideLoading();
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
