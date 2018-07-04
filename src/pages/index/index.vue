<template>
  <div class="pageIndex" :style="'height:'+ welcomeHeight">
        <div class="content">
            <i-grid class="pubColor">
                <a href="/pages/goods/main" class="pub-clo">
                    <i-grid-item>
                        <i-grid-icon>
                            <i-icon size="30" type="publishgoods_fill" />
                        </i-grid-icon>
                        <i-grid-label>要货</i-grid-label>
                    </i-grid-item>
                </a>
                <a href="/pages/orders/main">
                    <i-grid-item>
                        <i-grid-icon>
                            <i-icon size="30" type="createtask_fill" />
                        </i-grid-icon>
                        <i-grid-label>订单</i-grid-label>
                    </i-grid-item>
                </a>
            </i-grid>
            <i-grid class="pubColor">
                <i-grid-item>
                    <i-grid-icon>
                        <i-icon size="30" type="tasklist_fill" />
                    </i-grid-icon>
                    <i-grid-label>收货</i-grid-label>
                </i-grid-item>
                <i-grid-item>
                    <i-grid-icon>
                        <i-icon size="30" type="picture_fill" />
                    </i-grid-icon>
                    <i-grid-label>报表</i-grid-label>
                </i-grid-item>
            </i-grid>
        </div>

        <i-button @click="exit" class="pubColor">退出</i-button>

  </div>
</template>

<script>
import fetch from '@/utils/fetch'
import wxp from 'minapp-api-promise'
export default {
  data () {
    return {
      winHeight:null
    }
  },
  methods: {
      exit(){
          wx.removeStorageSync('userInfo');
          setTimeout(function(){
              wx.redirectTo({
                url: '../../pages/login/main'
              })
          })
      }
  },
  computed: {
      welcomeHeight() {
          if (this.winHeight) {
              return this.winHeight + 'px'
          }
      },
  },
  async onLoad() {
      let getSystemInfo = await wxp.getSystemInfo();
      this.winHeight = getSystemInfo.windowHeight;
      await wxp.setNavigationBarTitle({
        title: '天子星订货宝'
      })
  },
}
</script>

<style scoped lang="scss">
.pageIndex{
    width: 100%;
    font-size: 32rpx;
    background: #f8f8f9;
    overflow: hidden;
    .content{
        margin-bottom: 220rpx;
        margin-top: 100rpx;
        background: #fff;
        .pubColor{
            background: #fff;
        }
    }
}
</style>
