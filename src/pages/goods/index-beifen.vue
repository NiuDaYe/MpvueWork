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
                    <div class="telmp" v-for="(item,index) in category" :class="{'checkActive':index == selectIndex}">
                        <!-- {{item.categoryId}} -->
                        <p @click="findDcMaterialInfo(item,index)">{{item.categoryName}}</p>
                    </div>
                </scroll-view>
            </i-col>

            <i-col span="18" class="col-class">
                <div class="show-tittle">
                    蔬菜类
                </div>
                <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentRightHeight">
                    <div :style="'min-height:'+contentRightHeights">
                        <div class="cell-list" v-for="item in list">
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

        <div class="join-car">

            <div class="price" @tap="showHideCar">
                <i-badge :count="totalCount">
                    <template v-if="totalCount > 0">
                        <i-icon size="38" type="publishgoods_fill" color="#1e84ec"/>
                    </template>
                    <template v-else>
                        <i-icon size="38" type="publishgoods_fill" />
                    </template>
                </i-badge>
                <template v-if="totalPrice != null">
                    {{totalPrice}} 元
                </template>
            </div>
            <template v-if="totalCount > 0">
                <p class="settlement settlementActive" @click="toPAY">去结算</p>
            </template>
            <template v-else>
                <p class="settlement">请选购</p>
            </template>
        </div>

        <div class="maskLayer" v-if="showFalse" @click="hideCar"></div>
        <div class="join-car-list" v-show="showFalse">
            <scroll-view scroll-y class="cell-list-border">
                <p class="dele-all">清空购物车</p>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
                <div class="cell-list">
                    <div class="cell-left">
                        <p class="name">黄豆</p>
                        <p class="unit"> <span>￥534.11</span>/袋 </p>
                    </div>

                    <div class="cell-right">
                        <span> - </span>
                        <input type="text" class="write-number" :value="value" placeholder="数量" >
                        <span> + </span>
                    </div>
                </div>
            </scroll-view>
        </div>

    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import fetch from '@/utils/fetch'
import cartcontrols from '@/components/cartcontrol/index'
import Vue from 'vue'

export default{
    data(){
        return{
            dcList: [
                {
                    dcId: 1000,
                    dcName: '美国'
                },
            ],                  // 配送中心list
            indexs: 0,          // dcId
            selectIndex:0,   // 点击索引
            index:0,            // dcId 索引
            showFalse:false,
            searchName:'',
            value:"1",          // categoryId
            jiage:'20',
            winHeight:null,
            category:[          // 物品类别列表
                { categoryName: '坚果' },
                { categoryName: '蔬菜' },
            ],
            list:[
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

            ],             // 右侧物品列表

        }
    },
    methods:{
        showHideCar(){
            this.showFalse = !this.showFalse;
        },
        hideCar(){
            this.showFalse = false;
        },
        lower(){
            console.log('到底了');
        },
        // 保存选中的配送中心
        bindPickerChange(e) {
            let index = e.mp.detail.value
            console.log('index',index);
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
                //_this.findDcMaterialInfo(); //获取第一个分类下的可选物品
            })
            .catch(function (error) {
                wx.showLoading({
                  title: error,
                })
                setTimeout(function(){
                    wx.hideLoading()
                },1000)
            });
        },
        // 查找可用物品
        findDcMaterialInfo(item,index){
            let info = wx.getStorageSync('userInfo');
            let _this = this;
            let data = {};
            let categoryId = item.categoryId;
            this.selectIndex = index;

            if(categoryId == undefined){
                categoryId = _this.category[0].categoryId;
                this.indexs = info.dcList[0].dcId;
            }

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

            wx.showLoading({
              title: '加载中...',
            })

            fetch.post('/material/findDcMaterialInfo', data)
            .then(function (res) {
                 // console.log('res111111',res);

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
        // 总价
        totalPrice(){
            let total = 0;
            this.list.map((food)=>{
                if(!food.count){
                    Vue.set(this.list,'count',0)
                }else{
                    total += food.shippingPrice * food.count;
                }
            })
            return total;
        },
        // 数量总和
        totalCount(){
            let count = 0;
            this.list.map((food)=>{
                if(!food.count){
                    Vue.set(this.list,'count',0)
                }else{
                    count += food.count;
                }
            })
            return count;
        },

    },
    components:{
        cartcontrols
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
    .join-car{
        width: 100%;
        height: 120rpx;
        background: #f8f8f9;
        position: fixed;
        bottom: 0;
        z-index: 3;
        display: flex;
        justify-content:space-between;
        .price{
            height: 120rpx;
            line-height: 120rpx;
            width: 69%;
        }
        .settlement{
            height: 120rpx;
            width: 30%;
            line-height: 120rpx;
            padding-right: 16rpx;
            border-left: 1px solid #dddee1;
            text-align: center;
        }
        .settlementActive{
            background: #1e84ec;
            color: #fff;
        }
    }
    .join-car-list{
        .cell-list-border{
            .dele-all{
                text-align: right;
                font-size: 32rpx;
                padding-top: 16rpx;
                padding-right: 16rpx;
            }
            height: 600rpx;
            position: fixed;
            bottom: 120rpx;
            background: #fff;
            width: 100%;
            z-index: 3;
            overflow: hidden;
        }
        .cell-list{
            float: right;
            display: flex;
            justify-content:space-between;
            width: 98%;
            font-size: 32rpx;
            border-bottom: 1px solid #e9eaec;
            color:#495060;
            margin-top: 20rpx;
            padding-left: 2%;
            overflow: hidden;
            padding-bottom: 14rpx;
            .cell-left{
                width: 60%;
                .name{
                    font-size: 36rpx;
                }
                .unit{
                    font-size: 24rpx;
                    span{
                        color: #fc8884;
                    }
                }
            }
            .cell-right{
                width: 24%;
                display: inline-flex;
                margin-top: 12rpx;
                padding-right: 12rpx;
                .write-number{
                    text-align: center;
                    height: 60rpx;
                    line-height: 60rpx;
                }
                span{
                    display: block;
                    width: 240rpx;
                    height: 60rpx;
                    line-height: 56rpx;
                    border-radius: 50%;
                    border: 1px solid #dddee1;
                    text-align: center;
                    font-size: 44rpx;
                    font-weight: bold;
                }
                span:nth-child(1){
                    // color: #1e84ec;
                }
                span:nth-child(3){
                    color: #3b3a2e;
                    background: #fece6a;
                    border:none;
                }
            }
        }
    }
    .maskLayer{
        position: fixed;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        background: #000;
        opacity: .4;
        z-index: 2;
    }

}
</style>
