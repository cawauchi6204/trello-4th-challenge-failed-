// このコンポーネントに対する理解が浅い
<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <div class="deletelist" @click="removeList">✖︎</div>
      <card
      v-for="(item,index) in cards"
      :key = item.id
      :body="item.body"
      :cardIndex="index"
      :listIndex = "listIndex"
      >
      </card>
      <card-add :listIndex="listIndex"></card-add>
    </div>
  </div>
</template>

<script>
import CardAdd from './CardAdd'
import Card from './Card'
export default {
  props:{
    title:{
      type:String,
      required:true
    },
    cards:{
      type:Array,
      required:true
    },
    listIndex:{ 
      type:Number,
      required:true
    }
  },
  methods:{
    removeList() {
      if(confirm('本当にこのリストを削除しますか?')) {
        this.$store.dispatch('removelist' , {listIndex:this.listIndex})
      }
    }
  },
  components:{
    CardAdd,
    Card
  },
}
</script>

<style>

</style>