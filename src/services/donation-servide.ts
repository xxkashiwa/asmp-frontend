import request from '@/lib/request';
import { Donation } from '@/types';

const endPoint = '/donation';

export const getDonationList = async (params: Omit<Donation, 'id'>) => {
  return request({
    url: endPoint,
    method: 'GET',
    data: params,
  });
};

export const addDonation = async (data: Omit<Donation, 'id'>) => {
  return request({
    url: endPoint,
    method: 'POST',
    data: data,
  });
};

export const updateDonation = async (id: number, data: Omit<Donation, 'id'>) => {
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