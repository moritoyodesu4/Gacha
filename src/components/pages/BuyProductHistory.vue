<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="buy-product-history">
      <PageTitle title="商品購入履歴" />
      <LeafBox>
        <HistoryTable
          v-if="dispHistoryList && dispHistoryList.length > 0"
          class="history-table"
          :historyList="dispHistoryList"
          headerNameLeft="購入日"
          headerNameCenter="商品名"
          headerNameCenterRight="発送状況"
          headerNameRight="ポイント数"
          bodyLeftKey="buyDate"
          bodyCenterKey="packName"
          bodyCenterRightKey="sendState"
          bodyRightKey="usePoint"
          :isShowArrow="true"
          :isBorderLink="true"
          @handleHistoryRowClick="goToBuyProductHistoryDetail"
        />
        <div
          v-if="!(dispHistoryList && dispHistoryList.length > 0)"
          class="no-history"
        >
          <span>商品購入履歴がありません。</span>
        </div>
      </LeafBox>
      <BoxPager
        v-if="dispHistoryList &&
          dispHistoryList.length > 0 &&
          packHistoryList &&
          packHistoryList.page.pages.length > 0
        "
        class="box-pager"
        :totalPageCount="packHistoryList.page.all_page"
        :currentPageCount="packHistoryList.page.page"
        :dispBoxCount="packHistoryList.page.pages.length"
        @handlePagerClick="changeCurrentPageCount"
        @handleSquareBtnClick="changeCurrentPageCount"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import HistoryTable from '@/components/organisms/HistoryTable.vue';
import BoxPager from '@/components/organisms/BoxPager.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'BuyProductHistory',

  components: {
    BaseTemplate,
    HistoryTable,
    BoxPager,
    LeafBox,
    PageTitle,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      packHistoryList: 'packHistory/packHistoryList',
    }),
    dispHistoryList() {
      if (this.packHistoryList) {
        if (this.packHistoryList.list.length > 0) {
          const dispHistoryList = this.packHistoryList.list.reduce((acc, cur) => {
            const { id } = cur;
            const buyDate = cur.created.split(' ')[0].replace(/-/g, '/').slice(2);
            const packName = cur.pack_name;
            const sendState = cur.send_state;
            const usePoint = cur.point;
            acc.push({
              id, buyDate, packName, sendState, usePoint: `${separateCharacterNumber(usePoint)}`,
            });
            return acc;
          }, []);
          return dispHistoryList;
        }
      }
      return [];
    },
  },

  created() {
    const pageNumber = 1;
    this.$store.dispatch('packHistory/setPackHistoryList', { pageNumber });
  },

  methods: {
    changeCurrentPageCount(pageNumber) {
      this.$store.dispatch('packHistory/setPackHistoryList', { pageNumber });
    },
    goToBuyProductHistoryDetail(packHistoryId) {
      // メモ: beforeEnterでrouterに記載するとエラーとなるので、こちらに記載
      (async () => {
        const query = {
          packHistoryId,
        };
        await this.$store.dispatch('packHistory/setCurrentPackHistory', { packHistoryId });
        const currentPackHistory = this.$store.getters['packHistory/currentPackHistory'];
        const isDivision = currentPackHistory.status === '1';
        if (isDivision) {
          this.$router.push({ path: '/buy-product-history-detail', query });
        } else {
          this.$router.push('/get-card-list');
        }
      })();
    },
  },
};
</script>

<style lang="scss" scoped>
$pagerWidth: 316px;

.buy-product-history{
  position: relative;
  width: 100%;
  max-width: 375px;
  min-height: 100%;
  padding: 30px 20px 90px;
  margin: 0px auto;
  @media screen and (min-width:767px){
    max-width: 580px;
  }
  @media screen and (min-width:1023px){
    max-width: 1000px;
  }
  .history-table{
    width: 100%;
    margin: 0 50px;
  }
  .box-pager{
    position: absolute;
    left: calc(50% - #{$pagerWidth/2});
    bottom: 30px;
    width: $pagerWidth;
    height: 30px;
    margin: 0px auto;
  }
  .no-history{
    margin-top: 20px;
    font-family: $notoSans;
    font-size: 14px;
    line-height: 2.25;
    color: $white;
    text-align: center;
  }
}
@media screen and  (max-width: $tabletWidth) {
  .buy-product-history{
    padding: 30px 10px 90px;
    .history-table{
      margin: 0;
      .history-table-body {
        font-size: 12px;
      }
    }
  }
}
</style>
