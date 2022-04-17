<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="buy-point-history">
      <PageTitle title="ポイント履歴" />
      <LeafBox>
        <HistoryTable
          v-if="dispHistoryList && dispHistoryList.length > 0"
          class="history-table"
          :historyList="dispHistoryList"
          :isCenterLink="true"
          headerNameLeft="購入日"
          headerNameCenter="金額"
          headerNameRight="購入・還元ポイント"
          bodyLeftKey="buyDate"
          bodyCenterKey="money"
          bodyRightKey="bonusPoint"
          centerSize="108px"
          rightSize="68px"
          centerMargin="0 0 0 45px"
          rightMargin="0 0 0 41px"
          @center_click="center_click"
        />
        <div
          v-if="!(dispHistoryList && dispHistoryList.length > 0)"
          class="no-history"
        >
          <span>購入履歴がありません。</span>
        </div>
      </LeafBox>
      <BoxPager
        v-if="dispHistoryList &&
          dispHistoryList.length > 0 &&
          pointHistoryList &&
          pointHistoryList.page.pages.length > 0
        "
        class="box-pager"
        :totalPageCount="pointHistoryList.page.all_page"
        :currentPageCount="pointHistoryList.page.page"
        :dispBoxCount="pointHistoryList.page.pages.length"
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
  name: 'BuyPointHistory',

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
      pointHistoryList: 'pointHistory/pointHistoryList',
    }),
    dispHistoryList() {
      if (this.pointHistoryList) {
        if (this.pointHistoryList.list.length > 0) {
          const dispHistoryList = this.pointHistoryList.list.reduce((acc, cur) => {
            const {
              id, bonusPoint, money, created,
            } = cur;
            const historyId = cur.history_id;
            const buyDate = created.split(' ')[0].slice(2);
            acc.push({
              id,
              buyDate,
              historyId,
              isCenterLink: bonusPoint <= 0 && historyId > 0,
              bonusPoint: `${separateCharacterNumber(bonusPoint)}`,
              money: `${separateCharacterNumber(money)}円`,
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
    this.$store.dispatch('pointHistory/setPointHistoryList', { pageNumber });
  },

  methods: {
    changeCurrentPageCount(pageNumber) {
      this.$store.dispatch('pointHistory/setPointHistoryList', { pageNumber });
    },
    center_click(row) {
      if (!row.isCenterLink) {
        return;
      }
      const packHistoryId = row.historyId;
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

.buy-point-history{
  position: relative;
  width: 100%;
  max-width: 375px;
  padding: 30px 20px 90px;
  margin: 0px auto;
  @media screen and (min-width:767px){
    max-width: 580px;
  }
  @media screen and (min-width:1023px){
    max-width: 1000px;
  }
  .buy-point-history-title{
    display: flex;
    justify-content: center;
    .text{
      height: 44px;
      font-family: $notoSerif;
      font-size: 30px;
      font-weight: 700;
      color: $deepGray;
      text-shadow: $titleShadow;
    }
  }
  .history-table{
    width: 100%;
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
    color: $deepGray;
    text-align: center;
  }
}
</style>
