import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryCrawler(params) {
  return request('/api/crawler/all', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeCrawler(params) {
  return request('/api/crawler/delete', {
    method: 'POST',
    body: params,
  });
}

export async function addCrawler(params) {
  return request('/api/crawler/add', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCrawlerAccount(params) {
  return request('/api/crawlerAccount/all', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeCrawlerAccount(params) {
  return request('/api/crawlerAccount/delete', {
    method: 'POST',
    body: params,
  });
}

export async function addCrawlerAccount(params) {
  return request('/api/crawlerAccount/add', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCrawlerAccountConn(params) {
  return request('/api/crawlerAccountConn/all', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function toggleCrawlerAccountConn(params) {
  return request(`/api/crawlerAccountConn/toggle?${stringify(params)}`);
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryUserInfo(params) {
  return request('/api/userInfo/all', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryUserInfoDetail(id) {
  return request(`/api/userInfo/detail?id=${id}`);
}

export async function queryUserInfoStatistics(id) {
  let url = '/api/userInfo/statistics';
  if (id) {
    url += `?id=${id}`;
  }
  return request(url);
}

export async function updateUserInfo(params) {
  return request('/api/userInfo/update', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeUserInfo(params) {
  return request('/api/userInfo/delete', {
    method: 'POST',
    body: params,
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
