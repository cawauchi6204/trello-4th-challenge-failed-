<template>
<!-- テンプレートの中身は単一のタグでなければならないため、直下にdivタグをおく -->
  <div>
    <header>
      my Trello 4th-challenge
    </header>
    <main>
      <p class="info-line">ALL:0 tasks</p>
      <!-- これが親コンポーネント -->
      <!-- titleとlistIndexはここからListに受け渡される  -->
      <!-- ちなみにv-forを使うとき、key属性を与えることが必須である -->
      <!-- listsはstoreの値で今回はmapStateで持ってきている -->
      <list
      v-for="(item , index) in lists"
      :key="item.id"
      :title="item.title"
      :listIndex="index"
      ></list>
      <!-- ここで、Listコンポーネントを呼び出し、Listコンポーネントに必要なデータを渡しています。
      必要なデータとは、先ほどListコンポーネント作成時にpropsで受け取れるように定義したデータのことです。 -->
      <list-add></list-add>
    </main>
  </div>
</template>

<script>
import ListAdd from './ListAdd'
import List from './List'
// mapStateに対する理解が浅い
import {mapState} from 'vuex'
export default {
  // ここcomponentではなくcomponent「s」と書かないとちゃんと読み込まれない!!!!!!!!
  components:{
    ListAdd,
    List
  },
  // 今回は、stateを「そのまま」取得するので、mapStateヘルパーを使用しましょう。
  // store/index.jsで定義したstateに「this.$store.stateでアクセスすることもできます」が、これを複数書いていくことを考えるとコードが助長になっていきます。
  // そこで活躍するのがmapStateです。
  // stateで定義されたデータの名前と同じ名前の文字列でstateを呼び出すことができます。
  // オブジェクトスプレッド演算子（...の部分です）を使っているのは、computedのローカルのオブジェクトと一緒に定義できるようにするためです。
  // そもそも、computedにはオブジェクトを渡さないといけないルールがあります。 mapStateはこのオブジェクトスプレッド演算子を使わないと、オブジェクトを持ったオブジェクト（ネストされた状態）を返してしまい、computedはmapStateに定義された値を参照できないのです。
  // 少し難しい部分ですが、computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要があると知っておいてください。
    computed:{
    ...mapState([
      'lists'
    ])
  }
}
</script>
