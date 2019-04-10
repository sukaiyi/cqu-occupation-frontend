import { queryUserInfo, removeUserInfo, queryUserInfoDetail, updateUserInfo, queryUserInfoStatistics} from '@/services/api';

export default {
  namespace: 'userInfo',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    detail:{},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const rawPayload = payload ? { ...payload, pageNum: (payload.pageNum || 1) - 1 } : payload;
      const response = yield call(queryUserInfo, rawPayload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchDetail({ payload, callback}, { call, put }) {
      const response = yield call(queryUserInfoDetail, payload);
      if (callback) callback(response);
      yield put({
        type: 'detail',
        payload: response,
      });
    },
    * fetchDetailStatistics({ payload}, { call, put }) {
      const detailResponse = yield call(queryUserInfoDetail, payload);
      const statisticsResponse = yield call(queryUserInfoStatistics, payload);
      const response = [detailResponse, statisticsResponse];
      yield put({
        type: 'statistics',
        payload: response,
      });
    },
    * update({ payload }, { call, put }) {
      const response = yield call(updateUserInfo, payload);
      yield put({
        type: 'detail',
        payload: response,
      });
    },
    * remove({ payload, callback }, { call, put }) {
      yield call(removeUserInfo, payload);
      const response = yield call(queryUserInfo, payload);
      if (callback) callback();
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
          list: action.payload.obj.content,
          pagination:{
            current: action.payload.obj.number + 1,
            pageSize: action.payload.obj.size,
            total: action.payload.obj.totalElements,
          }
        },
      };
    },
    detail(state, action) {
      return {
        detail: action.payload.obj
      };
    },
    statistics(state, action) {
      return {
        detail: action.payload[0].obj,
        statistics: action.payload[1].obj
      };
    },
  },
};
