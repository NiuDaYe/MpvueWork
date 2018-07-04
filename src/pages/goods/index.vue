<!-- 产品页面 -->
<template>

    <div class="">

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

        <div class="googs">

            <div class="menu-wrapper" ref="menuWrapper">
                <scroll-view scroll-y class="left-con" :style="'height:'+contentLeftHeight" >
                    <ul>
                        <li class="telmp" v-for="(item,index) in list" :key="item" :class="{'checkActive':index == selectIndex}">
                             <p @click="clickFindDcMaterialInfo(item,index)">{{item.categoryName}}</p>
                        </li>
                    </ul>
                </scroll-view>
            </div>

            <div class="foods-wrapper" ref="foodsWrapper">
                <div class="show-tittle">
                    {{categoryName}}
                </div>
                <scroll-view scroll-y class="cell-list-border" @scrolltolower="lower" :style="'height:'+contentRightHeight">

                    <div class="cell-list" v-for="(item,index) in list" :key="item">

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

export default{
    data(){
        return{
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
            dcList: [                   // 配送中心列表
                {
                    dcId: 1000,
                    dcName: '美国'
                },
            ],
            list:[                      // 右侧物品列表
                ],
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
        // 点击查找可用物品 -- > 改成跳转到获取到的商品动画
        clickFindDcMaterialInfo(item,index){
            this.selectIndex = index;   // 选中状态索引
            this.categoryName = item.categoryName;

            // 添加锚点跳转事件
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
        this.findDcMaterialInfo();      // 右边可选物品
    },
    computed: {
        // 左侧高度
        contentLeftHeight() {
            if (this.winHeight) {
                return this.winHeight - 96 + 'px'
            }
        },
        // 右侧高度
        contentRightHeight(){
            if (this.winHeight) {
                return this.winHeight - 126  + 'px'
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

.googs{
    color:#495060;
    display: flex;
    position: absolute;
    top: 74rpx;
    bottom: 120rpx;
    width: 100%;
    // overflow: hidden;

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
