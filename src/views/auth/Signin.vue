<template>
    <signin-form />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SigninForm from '../../components/SigninForm.vue';

  @Component({
    components: { SigninForm },
    metaInfo: { title: 'Signin | Amazing Online Store' }
  })
  export default class Signin extends Vue {}
</script>
