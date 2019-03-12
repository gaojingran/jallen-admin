export default {
  // initial state
  state: {
    userInfo: {}
  },
  // handle state changes with pure functions
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  // handle state changes with impure functions.
  // use async/await for async actions
  effects: {
    async getUserInfo({ ajax, ajaxNotify, ...payload }, rootState) {
      try {
        const { data } = await ajax("userInfo");
        this.update({
          userInfo: data
        });
      } catch (err) {
        ajaxNotify(err);
      }
    }
  }
};
