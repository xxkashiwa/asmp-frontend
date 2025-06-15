import request from '@/lib/request';

import { Enterprise, convertToEnterprise } from '@/models/enterprise' 
const endPoint = '/enterprise';

export const getAllEnterprise = async () => {
  const response = await request({
    url: `${endPoint}`,
    method: 'GET'
  });
  const datas = response.data.map((data: any) => convertToEnterprise(data));
  return datas as Enterprise[];
};

export const getEnterpriseById = async (id: number) => {
  const response = await request ({
    url: `${endPoint}/${id}`,
    method: 'GET',
  });
  const data = convertToEnterprise(response.data);
  return data as Enterprise;
};

