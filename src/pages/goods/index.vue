<!-- 产品页面 -->
<template>
    <div class="googs">
        <div class="search">
            <view class="selectDcid">
              <picker @change="bindPickerChange" :value="index" range-key="dcName" :range="dcList">
                <view class="picker">
                  {{dcList[index].dcName}}
                </view>
              </picker>
            </view>

            <input type="text" placeholder="请输入物品名称" :value="searchName">
            <i-icon size="22" type="search" class="icon-search" />
        </div>

        <div class="menu">
            <i-col span="6" class="col-class" >
                <scroll-view scroll-y class="left-con" :style="'height:'+contentLeftHeight" >
                    <div class="telmp" v-for="(item,index) in category" wx:key="key" :class="{'checkActive':index == selectIndex}">
                         <p @click="clickFindDcMaterialInfo(item,index)">{{item.categoryName}}</p>
                    </div>
                </scroll-view>
            </i-col>

            <i-col span="18" class="col-class">
                <div class="show-tittle">
                    {{categoryName}}
                </div>
                <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentRightHeight">
                    <div :style="'min-height:'+contentRightHeights">
                        <div class="cell-list" v-for="item in list" wx:key="key">
                            <div class="cell-left">
                                <p class="name">{{item.materialName}}</p>
                                <p class="unit"> <span>￥{{item.shippingPrice}}</span>/{{item.unitName}} </p>
                            </div>
                            <cartcontrols :list="item"> </cartcontrols>
                        </div>
                    </div>

                </scroll-view>
            </i-col>
        </div>
        <shopcart :selectFoods="selectFoods"> </shopcart>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
import cartcontrols from '@/components/cartcontrol/index'
import shopcart from '@/components/shopcart/index'

export default{
    data(){
        return{
            dcList: [
                {
                    dcId: 1000,
                    dcName: '美国'
                },
            ],                  // 配送中心list
            indexs: 0,                  // dcId
            selectIndex:0,              // 点击索引
            index:0,                    // dcId 索引
            categoryName:'当前选项',     // 显示当前点击的分类选项
            searchName:'',
            value:"1",                  // categoryId
            jiage:'20',
            winHeight:null,             // window height
            category:[                  // 物品类别列表
                { categoryName: '坚果' },
                { categoryName: '蔬菜' },
            ],
            list:[                      // 右侧物品列表
                {
                  "dcId": 34,
                  "dcCode": "0901",
                  "dcName": "测试配送中心01",
                  "materialId": 19462,
                  "materialCode": "2300006",
                  "materialName": "门店库存测试3",
                  "stockUnitId": 4,
                  "stockUnitCode": "4001",
                  "stockUnitName": "斤",
                  "unitId": 4,
                  "unitCode": "4001",
                  "unitName": "斤",
                  "conversionValue": 1,
                  "deliveryMode": "unified",
                  "shippingPrice": 6,
                  "isBomgroup": "0",
                  "clearingType": "naturial_month",
                  "clearingTypeName": "自然月结算",
                },
                {
                  "dcId": 34,
                  "dcCode": "0901",
                  "dcName": "测试配送中心01",
                  "materialId": 19462,
                  "materialCode": "2300006",
                  "materialName": "门店库存测试3",
                  "stockUnitId": 4,
                  "stockUnitCode": "4001",
                  "stockUnitName": "斤",
                  "unitId": 4,
                  "unitCode": "4001",
                  "unitName": "斤",
                  "conversionValue": 1,
                  "deliveryMode": "unified",
                  "shippingPrice": 6,
                  "isBomgroup": "0",
                  "clearingType": "naturial_month",
                  "clearingTypeName": "自然月结算",
                },
            ],
        }
    },
    methods:{
        lower(){
            console.log('到底了');
        },
        // 保存选中的配送中心
        bindPickerChange(e) {
            let index = e.mp.detail.value
            let currentId = this.dcList[index].dcId; // 这个id就是选中项的id
            this.indexs = currentId;
            this.index = index;
        },
        //获取配送中心
        getDistributionCenter(){
            let info = wx.getStorageSync('userInfo');
            if(info.dcList.length == 0){
                // 后期加上没有配送中心的情况
                this.dcList[0].dcName = '无配送中心'
            }else{
                this.dcList = info.dcList;
            }

        },
        //获取物品类别 then 获取第一个分类下的可选物品
        findCategorys(){
            let info = wx.getStorageSync('userInfo');
            let _this = this;
            let data = {
                "tenancy_id":info.tenancyId,
            	"store_id":info.storeId,
            	"data":[],
                "pagination":null
            };
            data = JSON.stringify(data);

            fetch.post('/material/findCategory',data)
            .then(function (res) {
                _this.category = res.data
            })
            .then(function(){
                let item = _this.category[0];
                _this.firstFindDcMaterialInfo(item,0); //获取第一个分类下的可选物品
            })
            .catch(function (error) {
                wx.showLoading({
                    title: "分类获取失败！",
                })
                setTimeout(function(){
                    wx.hideLoading()
                },1000)
            });
        },
        // 第一次查找物品
        firstFindDcMaterialInfo(item,index){
            let info = wx.getStorageSync('userInfo');
            let _this = this;
            let data = {};
            let categoryId = item.categoryId;
            this.selectIndex = index;

            categoryId = _this.category[0].categoryId;
            this.indexs = info.dcList[0].dcId;
            this.categoryName = _this.category[0].categoryName;
            data = {
                "tenancy_id": info.tenancyId,              
                "store_id": info.storeId,
                "userId": info.userId,
                "userCode": info.userCode,
                "userName": info.userName,
                "data": [{
                        "code": "",
                        "categoryId":categoryId,
                        "dcId": _this.indexs
                     }],
                "pagination": null
            }
            data = JSON.stringify(data);
            this.pubFindDcMaterialInfo(data);
        },
        // 点击查找可用物品
        clickFindDcMaterialInfo(item,index){
            let info = wx.getStorageSync('userInfo');
            let _this = this;
            let data = {};
            let categoryId = item.categoryId;
            this.categoryName = item.categoryName;
            this.selectIndex = index;
            data = {
                "tenancy_id": info.tenancyId,              
                "store_id": info.storeId,
                "userId": info.userId,
                "userCode": info.userCode,
                "userName": info.userName,
                "data": [{
                        "code": "",
                        "categoryId":categoryId,
                        "dcId": _this.indexs
                     }],
                "pagination": null
            }
            data = JSON.stringify(data);
            this.pubFindDcMaterialInfo(data);
        },
        pubFindDcMaterialInfo(data){
            let _this = this;
            wx.showLoading({
              title: '加载中...',
            })
            fetch.post('/material/findDcMaterialInfo', data)
            .then(function (res) {
                if(res.errcode == 0){
                    _this.list = res.data;        //暂时关闭
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
                        if (res.confirm) {
                          //console.log('用户点击确定')
                        }
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
        this.findCategorys();           // 左边分类

    },
    computed: {
        // 左侧高度
        contentLeftHeight() {
            if (this.winHeight) {
                return this.winHeight - 110 + 'px'
            }
        },
        // 右侧高度
        contentRightHeight(){
            if (this.winHeight) {
                return this.winHeight - 140  + 'px'
            }
        },
        contentRightHeights(){
            if (this.winHeight) {
                return this.winHeight - 130 + 'px'
            }
        },
        selectFoods() {
            let foods = [];
            this.list.forEach((good) => {
                if (good.count) {
                    foods.push(good);
                }
            });
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
    color:#666;
}
.googs{
    color:#495060;
    .selectDcid{
        font-size: 26rpx;
        position: absolute;
        left: -160rpx;
        color: #333333;
        width: 140rpx;
        height: 52rpx;
        // border:1px solid red;
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
        input{
            border:1px solid #ccc;
            border-top-left-radius: 30rpx;
            border-top-right-radius: 30rpx;
            border-bottom-left-radius: 30rpx;
            border-bottom-right-radius: 30rpx;
            padding-top: 4rpx;
            line-height: 38rpx;
            width: 90%;
            font-size: 32rpx;
            color: #808080;
            padding-left: 2.4em;
        }
        .icon-search{
            position: absolute;
            top:0;
            left:8rpx;
        }
    }
    .menu{
        .left-con{
            width: 100%;
            background: #ecf2fe;
            margin-top: 20rpx;
            padding-top: 20rpx;
            p{
                height: 80rpx;
                line-height: 80rpx;
                font-size: 30rpx;
                padding-left: 32rpx;
                color: #2e537f;
            }
        }
        .show-tittle{
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            margin-top: 20rpx;
            background: #f8f8f9;
            color: #495060;
            font-size: 28rpx;
            text-indent: 1em;
        }
        .cell-list{
            float: right;
            display: flex;
            justify-content:space-between;
            width: 94%;
            font-size: 28rpx;
            border-bottom: 1px solid #e9eaec;
            color:#495060;
            margin-top: 20rpx;
            .cell-left{
                width: 60%;
                padding-bottom: 10rpx;
                .name{
                    font-size: 33rpx;
                }
                .unit{
                    font-size: 24rpx;
                    span{
                        color: #fc8884;
                    }
                }
            }
        }
    }
}
</style>
