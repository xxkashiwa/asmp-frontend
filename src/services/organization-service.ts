import request from '@/lib/request';
import { Organization } from '@/types';
const endPoint = '/organization';

export const getDonationList = async (params: Omit<Organization, 'id'>) => {
  return request({
    url: endPoint,
    method: 'GET',
    data: params,
  });
};

export const addDonation = async (data: Omit<Organization, 'id'>) => {
  return request({
    url: endPoint,
    method: 'POST',
    data: data,
  });
};

export const updateDonation = async (id: number, data: Omit<Organization, 'id'>) => {
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