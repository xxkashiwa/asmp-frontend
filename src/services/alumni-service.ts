/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/lib/request';
import { Alumni } from '@/types';
const endPoint = '/alumni';

export const getAlumniList = async (params: Omit<Alumni, 'id'>) => {
  return request({
    url: endPoint,
    method: 'GET',
    params,
  });
};
export const updateAlumni = async (id: number, params: Omit<Alumni, 'id'>) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'POST',
    data: params,
  })
}
export const addAlumni = async (params: Omit<Alumni, 'id'>) => {
  return request({
    url:  `${endPoint}`,
    method: 'POST',
    data: params,
  })
}
export const deleteAlumni = async (id: number) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'DELETE',
  });
}