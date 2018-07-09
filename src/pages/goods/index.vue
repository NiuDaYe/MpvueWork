<!-- 产品页面 -->
<template>
    <div>
        <div class="search">
            <view class="selectDcid">
              <picker @change="bindPickerChange" :value="index" range-key="dcName" :range="dcList">
                <view class="picker">
                  {{dcList[index].dcName}}
                </view>
              </picker>
            </view>
            <p class="searchName"><i-input :value="searchName" placeholder="请输入物品名称" maxlength=-1  @change="searchList" /></p>
            <i-icon size="22" type="search" class="icon-search" />
        </div>
        <div class="googs">
            <div class="menu-wrapper" ref="menuWrapper">
                <scroll-view scroll-y class="left-con" :style="'height:'+contentHeight" scroll-with-animation='true'>
                    <li class="telmp" v-for="(item,index) in list" :key="item" :class="{'checkActive': index == selectIndex}" >
                         <p @click="clickFindDcMaterialInfo" :id="'v'+index">{{item.categoryName}}</p>
                    </li>
                </scroll-view>
            </div>

            <div class="foods-wrapper">
                <scroll-view scroll-y class="cell-list-border" @scroll="leftmenu" scroll-with-animation='true' :scroll-into-view="toView" :style="'height:'+contentHeight">

                    <div class="cell-list" v-for="(item,index) in list" :key="index" :id="'v'+index">
                        <div class="show-tittle">
                            {{item.categoryName}}
                        </div>
                        <div v-for="(materialList,keys) in item.materialList" :key="materialList"  class="cell-left">
                            <div>
                                <p class="name">{{materialList.materialName}}</p>
                                <p class="unit"> <span>￥{{materialList.shippingPrice}}</span>/{{materialList.unitName}} </p>
                            </div>
                            <cartcontrols :list="materialList"> </cartcontrols>
                        </div>
                    </div>

                </scroll-view>
            </div>
            <shopcart :selectFoods="selectFoods"> </shopcart>
        </div>
    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
import cartcontrols from '@/components/cartcontrol/index'
import shopcart from '@/components/shopcart/index'
import { LeftMenuFun } from '@/utils/public'

export default{
    data(){
        return{
            index:0,                    // dcId 索引
            searchName:'',
            value:"1",                  // categoryId
            winHeight:null,             // window height
            category:[                  // 物品类别列表
                { categoryName: '坚果' },
                { categoryName: '蔬菜' },
            ],
            dcList: [                   // 配送中心列表
                {
                    dcId: 1000,
                    dcName: '美国'
                },
            ],
            list:[
                {
                    "categoryId": 1001,
                    "categoryCode": "011",
                    "categoryName": "蔬菜",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19178,
                            "materialCode": "0700043",
                            "materialName": "有机蓝莓",
                            "spec": "盒/12g",
                            "taxRate": 15,
                            "stockUnitId": 59,
                            "stockUnitCode": "8049",
                            "stockUnitName": "盒",
                            "unitId": 4,
                            "unitCode": "4001",
                            "unitName": "斤",
                            "conversionValue": 1,
                            "deliveryMode": "direct",
                            "shippingPrice": 4,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 2404,
                            "materialCode": "800046",
                            "materialName": "柠檬",
                            "taxRate": 15,
                            "stockUnitId": 4,
                            "stockUnitCode": "4001",
                            "stockUnitName": "斤",
                            "unitId": 4,
                            "unitCode": "4001",
                            "unitName": "斤",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 21,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 2168,
                            "materialCode": "900002",
                            "materialName": "陈皮2",
                            "spec": "20斤/箱",
                            "taxRate": 20,
                            "stockUnitId": 4,
                            "stockUnitCode": "4001",
                            "stockUnitName": "斤",
                            "unitId": 25,
                            "unitCode": "5002",
                            "unitName": "两",
                            "conversionValue": 6.6,
                            "deliveryMode": "unified",
                            "shippingPrice": 13.2,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        }
                    ]
                },
                {
                    "categoryId": 1002,
                    "categoryCode": "022",
                    "categoryName": "玉米",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19178,
                            "materialCode": "0700043",
                            "materialName": "有机蓝莓",
                            "spec": "盒/12g",
                            "taxRate": 15,
                            "stockUnitId": 59,
                            "stockUnitCode": "8049",
                            "stockUnitName": "盒",
                            "unitId": 4,
                            "unitCode": "4001",
                            "unitName": "斤",
                            "conversionValue": 1,
                            "deliveryMode": "direct",
                            "shippingPrice": 4,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 2404,
                            "materialCode": "800046",
                            "materialName": "柠檬",
                            "taxRate": 15,
                            "stockUnitId": 4,
                            "stockUnitCode": "4001",
                            "stockUnitName": "斤",
                            "unitId": 4,
                            "unitCode": "4001",
                            "unitName": "斤",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 21,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 2168,
                            "materialCode": "900002",
                            "materialName": "陈皮2",
                            "spec": "20斤/箱",
                            "taxRate": 20,
                            "stockUnitId": 4,
                            "stockUnitCode": "4001",
                            "stockUnitName": "斤",
                            "unitId": 25,
                            "unitCode": "5002",
                            "unitName": "两",
                            "conversionValue": 6.6,
                            "deliveryMode": "unified",
                            "shippingPrice": 13.2,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        }
                    ]
                },
                {
                    "categoryId": 1003,
                    "categoryCode": "033",
                    "categoryName": "红薯",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19178,
                            "materialCode": "0700043",
                            "materialName": "有机蓝莓",
                            "spec": "盒/12g",
                            "taxRate": 15,
                            "stockUnitId": 59,
                            "stockUnitCode": "8049",
                            "stockUnitName": "盒",
                            "unitId": 4,
                            "unitCode": "4001",
                            "unitName": "斤",
                            "conversionValue": 1,
                            "deliveryMode": "direct",
                            "shippingPrice": 4,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 2404,
                            "materialCode": "800046",
                            "materialName": "柠檬",
                            "taxRate": 15,
                            "stockUnitId": 4,
                            "stockUnitCode": "4001",
                            "stockUnitName": "斤",
                            "unitId": 4,
                            "unitCode": "4001",
                            "unitName": "斤",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 21,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 2168,
                            "materialCode": "900002",
                            "materialName": "陈皮2",
                            "spec": "20斤/箱",
                            "taxRate": 20,
                            "stockUnitId": 4,
                            "stockUnitCode": "4001",
                            "stockUnitName": "斤",
                            "unitId": 25,
                            "unitCode": "5002",
                            "unitName": "两",
                            "conversionValue": 6.6,
                            "deliveryMode": "unified",
                            "shippingPrice": 13.2,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 18,
                            "categoryCode": "07",
                            "categoryName": "本地果蔬"
                        }
                    ]
                },
                {
                    "categoryId": 1004,
                    "categoryCode": "44",
                    "categoryName": "面食",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19218,
                            "materialCode": "1400003",
                            "materialName": "凉面面条",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 6,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19219,
                            "materialCode": "1400004",
                            "materialName": "凉面面酱",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 3,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        }
                    ]
                },
                {
                    "categoryId": 1005,
                    "categoryCode": "55",
                    "categoryName": "西瓜",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19218,
                            "materialCode": "1400003",
                            "materialName": "凉面面条",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 6,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19219,
                            "materialCode": "1400004",
                            "materialName": "凉面面酱",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 3,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        }
                    ]
                },
                {
                    "categoryId": 1006,
                    "categoryCode": "66",
                    "categoryName": "苦瓜",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19218,
                            "materialCode": "1400003",
                            "materialName": "凉面面条",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 6,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19219,
                            "materialCode": "1400004",
                            "materialName": "凉面面酱",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 3,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        }
                    ]
                },
                {
                    "categoryId": 1007,
                    "categoryCode": "77",
                    "categoryName": "西红柿",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19218,
                            "materialCode": "1400003",
                            "materialName": "凉面面条",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 6,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19219,
                            "materialCode": "1400004",
                            "materialName": "凉面面酱",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 3,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        }
                    ]
                },
                {
                    "categoryId": 1008,
                    "categoryCode": "88",
                    "categoryName": "芹菜",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19218,
                            "materialCode": "1400003",
                            "materialName": "凉面面条",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 6,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19219,
                            "materialCode": "1400004",
                            "materialName": "凉面面酱",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 3,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        }
                    ]
                },
                {
                    "categoryId": 1009,
                    "categoryCode": "99",
                    "categoryName": "西葫芦",
                    "materialList": [
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19218,
                            "materialCode": "1400003",
                            "materialName": "凉面面条",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 6,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        },
                        {
                            "dcId": 4,
                            "dcCode": "CN0001",
                            "dcName": "华南配送中心",
                            "materialId": 19219,
                            "materialCode": "1400004",
                            "materialName": "凉面面酱",
                            "taxRate": 15,
                            "stockUnitId": 3,
                            "stockUnitCode": "9001",
                            "stockUnitName": "千克",
                            "unitId": 3,
                            "unitCode": "9001",
                            "unitName": "千克",
                            "conversionValue": 1,
                            "deliveryMode": "unified",
                            "shippingPrice": 3,
                            "isBomgroup": "0",
                            "clearingType": "purchase_clear",
                            "clearingTypeName": "采购单位结算",
                            "lastQty": 0,
                            "categoryId": 23,
                            "categoryCode": "14",
                            "categoryName": "面食"
                        }
                    ]
                },
            ],                      // 右侧物品列表
            selectIndex: 0,         // 点击索引
            toView: '',
        }
    },
    methods:{
        // 保存选中的配送中心
        bindPickerChange(e) {
            let index = e.mp.detail.value
            let currentId = this.dcList[index].dcId; // 这个id就是选中项的id
            this.index = index;
            this.findCategoryAndDcMaterial(currentId)
        },
        //获取配送中心
        getDistributionCenter(){
            let info = wx.getStorageSync('userInfo');
            if(info.dcList.length == 0){
                // 后期加上没有配送中心的页面样式
                this.dcList[0].dcName = '无配送中心'
            }else{
                this.dcList = info.dcList;
                let firstId = this.dcList[0].dcId;

                this.findCategoryAndDcMaterial(firstId);
            }
        },
        // 根据配送中心dcId获取所有的分类和物品
        findCategoryAndDcMaterial(firstId){
            let _this = this;
            let info = wx.getStorageSync('userInfo');
            let data = {};
            wx.showLoading({
              title: '加载中...',
            })
            data = {
                "tenancy_id": info.tenancyId,              
                "store_id": info.storeId,
                "userId": info.userId,
                "userCode": info.userCode,
                "userName": info.userName,
                "data": [{
                        "dcId": firstId
                     }],
                "pagination": null
            }
            data = JSON.stringify(data);

            fetch.post('/material/findCategoryAndDcMaterial', data)
            .then(function (res) {
                if(res.errcode == 0){
                    //_this.list = res.data;        //暂时关闭
                    wx.showLoading({
                      title: '加载完毕！',
                    })
                    setTimeout(function(){
                        wx.hideLoading()
                    },1000)
                }else{
                    wx.hideLoading()
                    wx.showModal({
                      title: '加载失败',
                      content: res.errmsg,
                      success: function(res) {
                        if (res.confirm) {}
                      }
                    })
                }
            })
            .catch(function (error) {
                wx.showLoading({
                  title: '加载失败!',
                })
                setTimeout(function(){
                  wx.hideLoading()
                },2000)
            });
        },
        // 点击查找可用物品 -- > 改成跳转到获取到的商品动画
        clickFindDcMaterialInfo(e){
            let _this = this;
            this.selectIndex = e.currentTarget.id;
            let gotoList = e.currentTarget.id;
            this.toView = gotoList;
            setTimeout(()=>{
                _this.toView = "";
            },100)
        },
        // 联动左侧效果
        leftmenu(e){
            var temp = LeftMenuFun(this.list);
            var len = temp.length
            var index = 0
            for (var i = 0; i < len; i++) {
              if (temp[i] > e.mp.detail.scrollTop) {
                  index =  i;
                  break;
              }
            }
            console.log('index',index);
            if (index!=this.selectIndex) {
                this.selectIndex = index;
                //this.toView = 'v'+index;
            }
        },
        // 模糊搜索商品
        searchList(event){
            let list = this.list;
            let searchName = event.mp.detail.detail.value;

            var arr = [];
    		list.map((res)=>{
    			res.materialList.map((item)=>{
    				if(item.materialName == searchName){
    					arr.push(item)
    				}
    			})
    		})

    		console.log('arr',arr)

        }
    },
    watch:{
        dcList:{
           handler(val, oldVal){},
           deep:true
       },
    },
    async onLoad() {
        let info = await wxp.getSystemInfo();
        let _this = this;
        this.winHeight = info.windowHeight;
        await wxp.setNavigationBarTitle({
          title: '要货'
        })
        this.getDistributionCenter();   // 配送中心
    },
    computed: {
        // 高度
        contentHeight() {
            if (this.winHeight) {
                return this.winHeight - 96 + 'px'
            }
        },
        // 选择后的数据同步购物车
        selectFoods() {
            let foods = [];
            this.list.forEach( (data) =>{
                data.materialList.forEach( (materialList)=>{
                    if(materialList.count){
                        foods.push(materialList);
                    }
                })
            })
            return foods;
        }
    },
    components:{
        cartcontrols,
        shopcart
    }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.checkActive{
    background: #fff;
    color:#60a2da;
}

.selectDcid{
    font-size: 26rpx;
    position: absolute;
    left: -160rpx;
    top:22rpx;
    color: #333333;
    width: 140rpx;
    height: 52rpx;
    text-align: center;
    line-height: 52rpx;
    overflow: hidden;
}
.search{
    width: 70%;
    height: 60rpx;
    color: #ccc;
    position: relative;
    margin-left: 24%;
    top:-18rpx;
    .searchName{
        padding-top: 4rpx;
        line-height: 38rpx;
        width: 90%;
        font-size: 32rpx;
        color: #808080;
        padding-left: 20rpx;
        height: 30rpx;
    }
    .icon-search{
        position: absolute;
        top:22rpx;
        left:8rpx;
    }
}

.googs{
    color:#495060;
    display: flex;
    position: absolute;
    top: 74rpx;
    bottom: 120rpx;
    width: 100%;
    .menu-wrapper{
        flex: 0 0 180rpx;
        width: 280rpx;
        background: #ecf2fe;
        font-size: 28rpx;
        color: #586d81;
        li{
            text-align: center;
            padding: 20rpx 0;
        }
    }
    .foods-wrapper{
        width: 94%;
        font-size: 28rpx;
        color:#495060;
        .show-tittle{
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            background: #f8f8f9;
            color: #495060;
            font-size: 28rpx;
            text-indent: 1em;
            // color: red;
        }
        .cell-list{
            .cell-left{
                width: 96%;
                padding: 20rpx 0;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #f0f5f8;
                margin-left: 2%;
                height: 90rpx;
                overflow: hidden;
                .name{
                    font-size: 33rpx;
                }
                .unit{
                    font-size: 26rpx;
                    padding-top: 6rpx;
                    span{
                        color: #fc8884;
                    }
                }
            }
        }
    }
}

</style>
