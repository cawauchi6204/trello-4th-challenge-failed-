<template>
<!-- テンプレートの中身は単一のタグでなければならないため、直下にdivタグをおく -->
  <div id="app">
    <board>
    </board>
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  name: 'App',
  components: {
    Board,
  }
}
</script>

