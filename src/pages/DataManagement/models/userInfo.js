import { queryUserInfo, removeUserInfo, queryUserInfoDetail, updateUserInfo} from '@/services/api';

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
      const response = yield call(queryUserInfo, payload);
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
            current: action.payload.obj.number,
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
  },
};
