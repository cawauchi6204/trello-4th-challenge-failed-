<template>
<!-- @submit.preventによりページが遷移することを防いでいる(リロードを防いでいる) -->
    <form 
    @submit.prevent="addList" 
    :class="classList"
    >
    <input
    v-model="title"
    type="text"
    class="text-input"
    placeholder="Add new list"
    @focusin="startEditing"
    @focusout="finishEditing"
    >
    <button 
    type="submit"
    class="add-button"
    v-if="isEditing || titleExists"
    >Add
    <!-- v-ifディレクティブに、フォームが活性の時（isEditing）と、テキストが入力された時(titleExists)を指定しました。なので、どちらかがtrueの時だけボタンが表示されます。 -->
    <!-- 算出プロパティはv-if=""に含めることができる -->
    <!-- template内ではcomputed propertyは単なる1つの値 -->
    </button>
    </form>
</template>

<script>
export default {
  // 単一ファイルコンポーネントの場合、dataはオブジェクト型になるためreturnでオブジェクトを返す必要がある
  // 各インスタンスが返されるデータオブジェクトの独立したコピーを保持できるため
  // 何回もこのコンポーネントが使われたときに同じコンポーネントのデータが変わったときに関数でなかった場合に全てのコンポーネントの値が変わってしまうため
  data() {
    return {
      title:'',
      isEditing:false,
    }
  },
  computed:{
    classList() {
      const classList = ['addlist']
      // this.isEditingがtrueだった場合,classListにactiveを追加する
      // classlistはform要素とバインディングされている
      if(this.isEditing) {
        classList.push('active')
      }

      if(this.titleExists) {
        classList.push('addable')
      }
      return classList
    },

    titleExists() {
      return this.title.length > 0
    }
  },
  methods:{
    addList() {
      // dispatchとは?
      // アクションは store.dispatch がトリガーとなって実行されます
      // アクションは、状態を変更するのではなく、ミューテーションをコミットする。
      // アクションは任意の非同期処理を含むことができる。
      // dispatchは第2引数に任意で引数を渡すこともできます。今回は{title:this.title}
      // その後、ストアのactionsでcommitを呼び出します。
      this.$store.dispatch('addlist' , {title:this.title}),
      this.title = ""
    },
    startEditing() {
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    }
  }
}
</script>