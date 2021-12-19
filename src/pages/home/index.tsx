import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import {
  AtGrid,
  AtModal,
  AtModalContent
} from "taro-ui";
import { useState } from "react";
import teamImg from "@/asstes/images/team.png";
import classImg from "@/asstes/images/class.png";
import zhanshiImg from "@/asstes/images/zhanshi.png";
import contactImg from "@/asstes/images/contact.png";
import Taro from "@tarojs/taro";
import "./index.less";

const Home = () => {
  /**
   * descript 图片尽量按照 375*200比列来
   */
  const [bannerList, setbannerList] = useState<string[]>([
    "https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180",
    "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180",
    "https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180"
  ]);
  const renderBanner = () => {
    return bannerList.map((item, index) => {
      return (
        <SwiperItem key={index}>
          <Image className='banner-item' src={item}></Image>
        </SwiperItem>
      );
    });
  };
  const chooseFnc = item => {
    switch (item.value) {
      case "关于我们":
        Taro.navigateTo({ url: "/pages/aboutUs/index" });
        break;
      case "关于课程":
        Taro.navigateTo({ url: "/pages/aboutClass/index" });
        break;
      case "优秀作品":
        Taro.navigateTo({ url: "/pages/goodGroup/index" });
        break;
      case "联系我们":
        Taro.previewImage({
          current: 'https://yameila.oss-cn-beijing.aliyuncs.com/home/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211219224359.jpg',
          urls:['https://yameila.oss-cn-beijing.aliyuncs.com/home/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211219224359.jpg']
        })
        break;
      default:
        console.log("错误功能项");
        break;
    }
  };
  return (
    <View className='home'>
      <Swiper
        className='banner-list'
        indicatorColor='#999'
        indicatorActiveColor='#c8a063'
        circular
        indicatorDots
        autoplay
      >
        {renderBanner()}
      </Swiper>
      <AtGrid
        hasBorder={false}
        columnNum={4}
        onClick={chooseFnc}
        data={[
          {
            image: teamImg,
            value: "关于我们"
          },
          {
            image: classImg,
            value: "关于课程"
          },
          {
            image: zhanshiImg,
            value: "优秀作品"
          },
          {
            image: contactImg,
            value: "联系我们"
          }
        ]}
      />
    </View>
  );
};

export default Home;
