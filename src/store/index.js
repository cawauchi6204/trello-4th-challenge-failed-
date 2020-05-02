import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// listsはsaveListsを探してなければ初期値を出す
// 中身はJSON.parseメソッドでデコードして調べている



// JavaScriptで連想配列をLocalStorageに保存する時の方法

// LocalStorageにJavaScriptの連想配列を保存したいときは以下のようになる。

// 保存する時
// 連想配列をそのまま保存しようとしても[object]とかになってしまう。
// var data = [];
// data.push({zip:'102-0072', address:'東京都千代田区飯田橋'});
// data.push({zip:'102-0082', address:'東京都千代田区一番町'});
// data.push({zip:'101-0047', address:'東京都千代田区内神田'});
// localStorage.setItem('json', data);
// JSON.stringifyを使ってちゃんとJSON文字列に変換してから保存すればうまくいく。
// var data = [];
// data.push({zip:'102-0072', address:'東京都千代田区飯田橋'});
// data.push({zip:'102-0082', address:'東京都千代田区一番町'});
// data.push({zip:'101-0047', address:'東京都千代田区内神田'});
// localStorage.setItem('json', JSON.stringify(data));
// 読み出す時
// 読み出せない場合
// 読み込んだ内容をそのまま変数に入れても、こんなになってしまう。
// var data = localStorage.getItem('json');
// for (var i = 0; i < data.length; i++) {
//   for (var key in data[i]) {
//     console.log(data[i][key]);
//   }
// }
// json_localstorage3
// 読み出せる例
// 読みだす時もJSON.parseを使ってJavaScriptのオブジェクトに変換してやればいい。
// var data = localStorage.getItem('json');
// data = JSON.parse(data);
// for (var i = 0; i < data.length; i++) {
//   for (var key in data[i]) {
//     console.log(data[i][key]);
//   }
// }

// 定数sabedListsにローカルストレージからtrello-listsを代入している
const savedLists = localStorage.getItem('trello-lists');

const store = new Vuex.Store({
  state:{
    lists:savedLists ? JSON.parse(savedLists):[
      // カードのタイトルと内容が入っている
      {
        title:'Backlog',
        cards:[
          {body:'English'},
          {body:'Mathmatics'}
        ]
      },
      {
        title:'Todo',
        cards:[
          {body:'Science'},
        ]
      },
      {
        title:'Doing',
        cards:[]
      },
    ],

  },
  mutations:{
    // このmutationsのコミットは直接各コンポーネントから実行することもできますが、基本的にコンポーネントでの操作はactionsで行うことが推薦されています。
    // mutationsの重要なルールとして、同期的でなければならないというのがあります。
    // もし、mutationsのメソッド内で非同期通信も一緒に行った場合、デバッグでデータの状態がいつ変更されたか追うことができないためです。
    // データの状態変更と非同期通信は役割で分けて考えるべきだということです。
    // 今回の実装には非同期通信は含まれません。
    // ですが、mutationsはあくまでもストアの状態の変更だけを行う。mutationsの呼び出しはactionsが行う。という役割も分けた方がよいでしょう。
    // Actionでは、Mutationに対してcommitを行うことで間接的に状態を変更しますが、Actionを呼び出すためのdispatchメソッドはPromiseを返すため、処理の順序を制御することが可能になります。
    // Mutationは状態の変更のみを行う(privateな(Actionだけから呼ばれる)セッター)
    // Actionは処理の公開や複雑な処理を行う(publicなメソッド)
    // listsにtitleとcardsを入れていく
    addlist(state,payload) {
      state.lists.push({title:payload.title , cards:[]})
    },
    removelist(state,payload) {
      state.lists.splice(payload.listIndex , 1)
    },
    addCardToList(state,payload) {
      state.lists[payload.listIndex].cards.push({body:payload.body})
    },
    removeCardFromList(state,payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex , 1)
    }
  },
  actions:{
    addlist(context,payload) {
      context.commit('addlist' , payload)
    },
    reomovelist(context,payload) {
      context.commit('removelist' , payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
  },
  getters:{

  }
})

// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれます。
// 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態を受け取ります。
// これでリロードしてもストアのデータの状態は維持されるようになりました。

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store