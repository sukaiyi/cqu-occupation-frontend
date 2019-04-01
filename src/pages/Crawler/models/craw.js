import { queryCrawler, removeCrawler, addCrawler } from '@/services/api';

export default {
  namespace: 'craw',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryCrawler, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * add({ payload, callback }, { call, put }) {
      yield call(addCrawler, payload);
      if (callback) callback();
      const response = yield call(queryCrawler);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * remove({ payload, callback }, { call, put }) {
      yield call(removeCrawler, payload);
      if (callback) callback();
      const response = yield call(queryCrawler);
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
