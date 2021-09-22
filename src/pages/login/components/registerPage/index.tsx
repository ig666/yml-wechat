import {useState} from "react";
import {useRequest, useToast} from "taro-hooks";
import { View } from "@tarojs/components";
import {AtInput,AtForm,AtButton,AtIcon } from "taro-ui";
import {request} from '../../../../utils/request';
import './index.less'


const RegisterPage=(props)=>{
  const {goLogin}=props
  const [show]=useToast({title:'注册成功'})
  const [form,setVal]=useState({phone:'',password:''})
  const {run}=useRequest(request, {
    manual: true,
    onSuccess: () => {
      show()
      goLogin('normal')
    },
  });
  return (
    <View className='register-page'>
      <View className='title'><AtIcon onClick={()=>goLogin('normal')} value='chevron-left' size='30' ></AtIcon><View className='title-text'>注册</View></View>
      <AtForm>
        <AtInput
          required
          name='phone'
          title='手机号:'
          type='phone'
          placeholder='请输入手机号'
          value={form.phone}
          onChange={(val:string)=>{setVal((formData)=>{
            formData.phone=val;
            return formData
          })}}
        />
        <AtInput
          required
          name='password'
          title='密码:'
          type='password'
          placeholder='请输入密码'
          value={form.password}
          onChange={(val:string)=>{setVal((formData)=>{
            formData.password=val;
            return formData
          })}}
        />
        <View style={{marginTop:'64rpx'}}>
          <AtButton type='primary' onClick={()=>{run('/wechat/register','POST',form)}}>注册</AtButton>
        </View>
      </AtForm>
    </View>
  )
}

export default RegisterPage;
