import request from '@/lib/request';

const endPoint = '/donation';

export const getDonationList = async (params: any) => {
  return request({
    url: endPoint,
    method: 'GET',
    params,
  });
};

export const addDonation = async (data: any) => {
  return request({
    url: endPoint,
    method: 'POST',
    data,
  });
};

export const updateDonation = async (id: number, data: any) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'PUT',
    data,
  });
};

export const deleteDonation = async (id: number) => {
  return request({
    url: `${endPoint}/${id}`,
    method: 'DELETE',
  });
};