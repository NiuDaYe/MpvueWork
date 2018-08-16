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
            <shopcart :selectFoods="selectFoods" @ievent="showMsgFromChild"> </shopcart>
        </div>

        <div v-if="searchResult" class="searchResult foods-wrapper">
            <scroll-view scroll-y class="cell-list-border" scroll-with-animation='true' :style="'height:'+contentHeight">

                <div v-for="(materialList,keys) in screening" :key="materialList"  class="cell-left">
                    <div>
                        <p class="name">{{materialList.materialName}}</p>
                        <p class="unit"> <span>￥{{materialList.shippingPrice}}</span>/{{materialList.unitName}} </p>
                    </div>
                    <cartcontrols :list="materialList"> </cartcontrols>
                </div>

            </scroll-view>

        </div>
    </div>
</template>

<script>
import wxp from 'minapp-api-promise'
import cartcontrols from '@/components/cartcontrol/index'
import shopcart from '@/components/shopcart/index'
import { LeftMenuFun } from '@/utils/public'
import { findCategory } from '@/api/request'

export default{
    data(){
        return{
            index:0,                    // dcId 索引
            searchName:'',
            value:"1",                  // categoryId
            winHeight:null,             // window height
            category:[],                // 物品类别列表
            dcList: {},                 // 配送中心列表
            list:[                      // 右侧物品列表
            ],
            selectIndex: 0,             // 点击索引
            toView: '',
            screening:'',               // 筛选出来的数据
            searchResult:false,         // 筛选出来的数据显隐
            userInfo:null,
        }
    },
    methods:{
        // 保存选中的配送中心
        bindPickerChange(e) {
            let index = e.mp.detail.value;
            let currentId = this.dcList[index].dcId; // 这个id就是选中项的id
            this.index = index;
            this.findCategoryAndDcMaterial(currentId);
            this.searchResult = false;
            this.searchName = "";
        },
        //获取配送中心
        getDistributionCenter(){
            if(this.userInfo.dcList.length == 0){
                // 后期加上没有配送中心的页面样式
                this.dcList[0].dcName = '无配送中心'
            }else{
                this.dcList = this.userInfo.dcList;
                let firstId = this.dcList[0].dcId;
                this.findCategoryAndDcMaterial(firstId);
            }
        },
        // 根据配送中心dcId获取所有的分类和物品
        findCategoryAndDcMaterial(firstId){
            let data = {};
            wx.showLoading({
              title: '加载中...',
            });
            console.log('firstId',firstId)
            data = {
                "tenancy_id": this.userInfo.tenancyId,              
                "store_id": this.userInfo.storeId,
                "userId": this.userInfo.userId,
                "userCode": this.userInfo.userCode,
                "userName": this.userInfo.userName,
                "data": [{
                    "dcId": firstId
                 }],
                "pagination": null
            }
            data = JSON.stringify(data);
            findCategory(data).then( res =>{
                if(res.errcode == 0){
                    this.list = res.data;        //暂时关闭
                    console.log('this.list',this.list)
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
                      success: function(res) {}
                    })
                }
            })
        },
        // 点击查找可用物品
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
            let temp = LeftMenuFun(this.list);
            let len = temp.length
            let index = 0
            for (var i = 0; i < len; i++) {
              if (temp[i] > e.mp.detail.scrollTop) {
                  index =  i;
                  break;
              }
            }
            if (index!=this.selectIndex) {
                this.selectIndex = index;
            }
        },
        // 模糊搜索商品
        searchList(event){
            let list = this.list;
            this.searchName = event.mp.detail.detail.value;
            var arr = [];
    		list.map((res)=>{
    			res.materialList.map((item,index)=>{
                    if(item.materialName.indexOf(this.searchName) != -1 ){
    					arr.push(item)
    				}
    			})
    		})
            if(this.searchName == "") arr = [];

            if(arr.length > 0){
                this.screening = arr;
                this.searchResult = true;
            }else{
                this.searchResult = false;
            }
        },
    },
    watch:{
        dcList:{
           handler(val, oldVal){},
           deep:true
       },
    },
    async onLoad() {
        this.userInfo = wx.getStorageSync('userInfo');
        let info = await wxp.getSystemInfo();
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
            // console.log('this.list',this.list)
            this.list.forEach( data =>{
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

.searchResult{
    width:100%;
    height:600px;
    background:#fff;
    position:fixed;
    left:0;
    top:36px;
    z-index:3;
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

</style>
