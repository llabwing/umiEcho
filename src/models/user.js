export default {
  namespace: 'user',

  state: {
   name:''
  },

  subscriptions: {},

  effects: {
    * login({payload},{calld,put}){
      console.log('登陆接口')
    }
  },
};
