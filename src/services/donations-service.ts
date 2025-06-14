import request from '@/lib/request';
import { Donations, convertToDonations } from '@/models/donations';

const endPoint = '/donations';

export const getAllDonations = async () => {
  const response = await request({
    url: `${endPoint}`,
    method: 'GET',
  });
  const datas = response.data.map((item: any) => convertToDonations(item));
  return datas as Donations[];
}

export const getDonationsById = async (id: string) => {
  const response = await request({
    url: `${endPoint}/${id}`,
    method: 'GET',
  });
  const data = convertToDonations(response.data);
  return data as Donations;
}