import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View,Picker  } from "@tarojs/components";
import {useState} from "react";
import "./index.less";

enum Gender {
  '男' = 1, // 男
  '女' = 2 // 女
}

const IntactInfo = () => {
  const selector=['男','女']
  const [info,setInfo]=useState({name:"",clinic:"",post:"",gender:Gender['男']})
  const changeGender=(val)=>{
    setInfo({...info,gender:parseInt(val.detail.value)===0?1:2})
  }
  console.log(info,'参数')
  return (
    <View className='intact-info'>
      <AtForm>
        <AtInput
          required
          clear
          name='name'
          title='姓名:'
          type='text'
          placeholder='请输入姓名'
          value={info.name}
          onChange={(val:string)=>{setInfo((data)=>{
            data.name=val
            return data;
          })}}
        />
        <Picker mode='selector' range={selector} onChange={changeGender}>
          <AtInput
            required
            name='gender'
            title='性别:'
            type='text'
            placeholder='请选择性别'
            value={Gender[info.gender]}
            onChange={()=>{}}
          />
        </Picker>
        <AtInput
          required
          clear
          name='clinic'
          title='诊所:'
          type='text'
          placeholder='请输入诊所名称'
          value={info.clinic}
          onChange={(val:string)=>{setInfo((data)=>{
            data.clinic=val
            return data;
          })}}
        />
        <AtInput
          required
          clear
          name='post'
          title='职务:'
          type='text'
          placeholder='请输入职务'
          value={info.post}
          onChange={(val:string)=>{setInfo((data)=>{
            data.post=val
            return data;
          })}}
        />
        <AtButton formType='submit'>完善资料</AtButton>
      </AtForm>
    </View>
  );
};

export default IntactInfo;
