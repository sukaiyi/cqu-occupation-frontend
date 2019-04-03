import request from '@/utils/request';

export async function query(params) {
  return request('/api/user/all', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addUser(params) {
  return request('/api/user/add', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeUser(params) {
  return request('/api/user/delete', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrent() {
  return request('/api/user/currentUser');
}
