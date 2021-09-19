export default {
  pages: [
    "pages/login/index",
    "pages/home/index",
    "pages/mine/index",
    "pages/register/index",
    "pages/work/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#333333",
    backgroundColor: "#fafafa",
    selectedColor: "#6190E8",
    borderStyle: "white",
    list: [
      {
        text: "首页",
        pagePath: "pages/home/index",
        iconPath: "asstes/images/home.png",
        selectedIconPath:"asstes/images/check-home.png"
      },
      {
        text: "作业",
        pagePath: "pages/work/index",
        iconPath: "asstes/images/work.png",
        selectedIconPath:"asstes/images/check-work.png"
      },
      {
        text: "报名",
        pagePath: "pages/register/index",
        iconPath: "asstes/images/register.png",
        selectedIconPath:"asstes/images/check-register.png"
      },
      {
        text: "我的",
        pagePath: "pages/mine/index",
        iconPath: "asstes/images/mine.png",
        selectedIconPath:"asstes/images/check-mine.png"
      },
    ],
    "position": "bottom"
  }
};
