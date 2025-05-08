/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/lib/request';
const endPoint = '/alumni';

export const getAlumniList = async (params: any) => {
  return request({
    url: endPoint,
    method: 'GET',
    params,
  });
};
