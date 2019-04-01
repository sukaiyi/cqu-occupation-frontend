import { queryCrawlerAccountConn, toggleCrawlerAccountConn } from '@/services/api';

export default {
  namespace: 'crawAccountConn',

  state: {
    data: [],
    columns:[],
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryCrawlerAccountConn, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * toggle({ payload, callback }, { call, put }) {
      yield call(toggleCrawlerAccountConn, payload);
      if (callback) callback();
      const response = yield call(queryCrawlerAccountConn);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        data: action.payload.obj.conns,
        columns: action.payload.obj.crawlers,
        rows: action.payload.obj.crawlerAccounts,
      };
    },
  },
};
