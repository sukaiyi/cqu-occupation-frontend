import { query as queryUsers, queryCurrent, addUser,removeUser,updateUser } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    data: {},
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const rawPayload = payload ? { ...payload, pageNum: (payload.pageNum || 1) - 1 } : payload;
      const response = yield call(queryUsers, rawPayload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      yield call(addUser, payload);
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateUser, payload);
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      yield call(removeUser, payload);
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
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
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.obj || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
