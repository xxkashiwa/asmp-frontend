import request from '@/lib/request';

const endPoint = '/admin';

export const register = async (username: string, password: string) => {
  return request({
    url: `${endPoint}/register`,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};

export const login = async (username: string, password: string) => {
  return request({
    url: `${endPoint}/login`,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};
