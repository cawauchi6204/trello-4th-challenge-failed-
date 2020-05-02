<template>
  <div class="card">
    <button 
    @click="removeCardFromList"
    class="close-button"
    >✖︎</button>
    <div class="body">
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    body:{
      type:String,
      required:true
    },
    listIndex:{
      type:Number,
      required:true
    },
    cardIndex:{
      type:Number,
      required:true
    }
  },
  methods:{
    removeCardFromList() {
      if(confirm('本当にこのカードを削除しますか？')) {
        this.$store.dispatch('removeCardFromList' , {cardIndex:this.cardIndex,listIndex:this.listIndex})
      }
    }
  }
}
</script>