import request from '@/lib/request';
import {Partnership} from '@/types';
const endPoint = '/partnership';

export const getDonationList = async (params: Omit<Partnership, 'id'>) => {
  return request({
    url: endPoint,
    method: 'GET',
    data: params,
  });
};

export const addDonation = async (data: Omit<Partnership, 'id'>) => {
  return request({
    url: endPoint,
    method: 'POST',
    data: data,
  });
};

export const updateDonation = async (id: number, data: Omit<Partnership, 'id'>) => {

  return request({
    url: `${endPoint}/${id}`,
    method: 'PUT',
    data: data,
  });
};

export const deleteDonation = async (id: number) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'DELETE',
  });
};