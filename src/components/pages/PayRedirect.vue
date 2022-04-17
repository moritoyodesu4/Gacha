<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="pay-redirect">
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';

export default {
  name: 'PayRedirect',

  components: {
    BaseTemplate,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },
};
</script>

<style lang="scss" scoped>
.pay-redirect{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 30px 25px 30px;
  margin: 0px auto;
}
</style>
