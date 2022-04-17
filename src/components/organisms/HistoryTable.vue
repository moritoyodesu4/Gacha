<template>
  <div class="history-table" :style="styleVariables">
    <div class="history-table-header">
      <span class="text left">{{headerNameLeft}}</span>
      <span class="text center">{{headerNameCenter}}</span>
      <span v-if="headerNameCenterRight" class="text center-right">{{headerNameCenterRight}}</span>
      <span class="text right" :class="{ 'margin-right': isShowArrow }">{{headerNameRight}}</span>
    </div>
    <div class="history-table-body" :class="{hasLink: isBorderLink}">
      <template v-for="(historyItem) in historyList">
        <div
          class="history-table-row"
          :key="historyItem.id"
          @click.stop="handleHistoryRowClick(historyItem.id)"
        >
          <span class="text left">{{historyItem[bodyLeftKey]}}</span>
          <span
            class="text center">
            {{historyItem[bodyCenterKey]}}
          </span>
          <span
            v-if="bodyCenterRightKey"
            class="text center-right"
            :class="{
              mihasou: historyItem[bodyCenterRightKey] == '未発送',
              sumi: historyItem[bodyCenterRightKey] == '発送済み'
            }">
            {{historyItem[bodyCenterRightKey]}}
          </span>
          <span class="text right"
                :class="{link: historyItem.isCenterLink}"
                @click="center_click(historyItem)">{{historyItem[bodyRightKey]}}</span>
          <i v-if="isShowArrow" class="far fa-angle-right" ></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryTable',

  props: {
    historyList: {
      type: Array,
      default: () => [],
    },
    headerNameLeft: {
      type: String,
    },
    headerNameCenter: {
      type: String,
    },
    headerNameCenterRight: {
      type: String,
    },
    headerNameRight: {
      type: String,
    },
    bodyLeftKey: {
      type: String,
    },
    bodyCenterKey: {
      type: String,
    },
    bodyCenterRightKey: {
      type: String,
    },
    bodyRightKey: {
      type: String,
    },
    leftSize: {
      type: String,
      default: '58px',
    },
    centerSize: {
      type: String,
      default: '154px',
    },
    centerRightSize: {
      type: String,
      default: '56px',
    },
    rightSize: {
      type: String,
      default: '62px',
    },
    centerMargin: {
      type: String,
      default: '0 0 0 20px',
    },
    centerRightMargin: {
      type: String,
      default: '0 0 0 20px',
    },
    rightMargin: {
      type: String,
      default: '0 0 0 15px',
    },
    leftTextAlign: {
      type: String,
      default: 'left',
    },
    centerTextAlign: {
      type: String,
      default: 'left',
    },
    centerRightTextAlign: {
      type: String,
      default: 'center',
    },
    rightTextAlign: {
      type: String,
      default: 'left',
    },
    isShowArrow: {
      type: Boolean,
      default: false,
    },
    isCenterLink: {
      type: Boolean,
      default: false,
    },
    isBorderLink: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    styleVariables() {
      return {
        '--left-size': this.leftSize,
        '--center-size': this.centerSize,
        '--center-right-size': this.centerRightSize,
        '--right-size': this.rightSize,
        '--center-margin': this.centerMargin,
        '--center-right-margin': this.centerRightMargin,
        '--right-margin': this.rightMargin,
        '--left-text-align': this.leftTextAlign,
        '--center-text-align': this.centerTextAlign,
        '--center-right-text-align': this.centerRightTextAlign,
        '--right-text-align': this.rightTextAlign,
      };
    },
  },

  methods: {
    handleHistoryRowClick(historyItemId) {
      this.$emit('handleHistoryRowClick', historyItemId);
    },
    center_click(historyItem) {
      this.$emit('center_click', historyItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.history-table{
  .history-table-header{
    display: flex;
    width: 100%;
    height: 23px;
    border-bottom: 1px solid $deepGray;
    .text{
      font-family: $notoSans;
      font-size: 12px;
      line-height: 2.25;
      color: $deepGray;
      text-align: center;
      white-space: nowrap;
      &.left{
        flex: 1 0 var(--left-size);
        text-align: var(--left-text-align);
      }
      &.center{
        flex: 1 1 var(--center-size);
        margin: var(--center-margin);
        text-align: var(--center-text-align);
      }
      &.center-right{
        flex: 1 0 var(--center-right-size);
        margin: var(--center-right-margin);
        text-align: var(--center-right-text-align);
      }
      &.right{
        flex: 0 0 var(--right-size);
        margin: var(--right-margin);
        text-align: var(--right-text-align);
        &.margin-right{
          margin-right: 26px;
        }
        @media screen and (min-width:767px){
          min-width: 180px;
        }
        @media screen and (min-width:1023px){
          min-width: 180px;
        }
      }
    }
    @media screen and (min-width:767px){
      height: 34px;
      .text{
        font-size: 16px;
      }
    }
    @media screen and (min-width:1023px){
      height: 42px;
      .text{
        font-size: 20px;
      }
    }
  }
  .history-table-body{
    width: 100%;
    margin-top: 10px;
    .history-table-row{
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0 20px;
      transition: 0.4s;
      .text{
        font-family: $notoSans;
        font-size: 12px;
        line-height: 27px;
        color: $deepGray;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.left{
          flex: 1 0 var(--left-size);
          text-align: var(--left-text-align);
        }
        &.center{
          flex: 1 1 var(--center-size);
          margin: var(--center-margin);
          text-align: var(--center-text-align);
        }
        &.center-right{
          flex: 1 0 var(--center-right-size);
          margin: var(--center-right-margin);
          text-align: var(--center-right-text-align);
        }
        &.right{
          overflow: unset;
          flex: 0 0 var(--right-size);
          margin: var(--right-margin);
          text-align: var(--right-text-align);
          @media screen and (min-width:767px){
            min-width: 180px;
          }
          @media screen and (min-width: 1023px){
            min-width: 180px;
          }
          &:before {
            content: "P";
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 28px;
            height: 28px;
            background-color: $yellow;
            border-radius: 100px;
            margin-right: 10px;
            color: $deepGray;
          }
        }
        @media screen and (min-width:767px){
          font-size: 14px;
        }
        @media screen and (min-width: 1023px){
          font-size: 18px;
        }
        .mihasou {
          color: $red!important;
        }
        .sumi {
          color: $yellow!important;;
        }
      }
      .fa-angle-right{
        margin-left: 20px;
        color: $deepGray;
        cursor: pointer;
      }
      & + .history-table-row{
        margin-top: 5px;
      }
      &:nth-child(2n) {
        background-color: #a0a0a0;
      }
    }
  }
  .hasLink {
    .history-table-row {
      &:hover {
        cursor: pointer;
        background-color: $black;

        .left, .center, .center-right {
          color: $white !important;
        }

        .right {
          color: $yellow !important;

          &:before {
            background-color: $yellow !important;
          }
        }
      }
    }
  }
}
.link {
  cursor: pointer;
  text-decoration: underline;
}
@media screen and  (max-width: $tabletWidth) {
  .fa-angle-right {
    display: none!important;
  }
  .history-table {
    .history-table-body {
      .history-table-row {
        padding: 0;
        .text {
          &.right {
            &:before {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
