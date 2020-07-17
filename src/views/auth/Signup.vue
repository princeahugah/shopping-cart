<template>
    <signup-form />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SignupForm from '../../components/SignupForm.vue';

  @Component({
    components: { SignupForm },
    metaInfo: { title: 'Sign Up | Amazing Online Store' }
  })
  export default class Signup extends Vue {}
</script>
