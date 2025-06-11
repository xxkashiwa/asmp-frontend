import request from '@/lib/request';
import { News } from '@/types';
const endPoint = '/campus-news';

export const getCampusNewsList = async (params: Omit<News, 'id'>) => {
  return request({
    url: endPoint,
    method: 'GET',
    data: params,
  });
};

export const addCampusNews = async (data: Omit<News, 'id'>) => {
  return request({
    url: endPoint,
    method: 'POST',
    data: data,
  });
};

export const updateCampusNews = async (id: number, data: Omit<News, 'id'>) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'PUT',
    data: data,
  });
};

export const deleteCampusNews = async (id: number) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'DELETE',
  });
};