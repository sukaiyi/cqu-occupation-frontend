import { queryCrawlerAccount, removeCrawlerAccount, addCrawlerAccount } from '@/services/api';

export default {
  namespace: 'crawAccount',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryCrawlerAccount, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * add({ payload, callback }, { call, put }) {
      yield call(addCrawlerAccount, payload);
      if (callback) callback();
      const response = yield call(queryCrawlerAccount);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * remove({ payload, callback }, { call, put }) {
      yield call(removeCrawlerAccount, payload);
      if (callback) callback();
      const response = yield call(queryCrawlerAccount);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        data: {
          list: action.payload.obj,
        },
      };
    },
  },
};
