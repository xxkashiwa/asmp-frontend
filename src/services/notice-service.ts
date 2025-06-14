import request from '@/lib/request';

import { Notice, convertToNotice } from '@/models/notice' 
const endPoint = '/notice';

export const getAllNotice = async () => {
  const response = await request({
    url: `${endPoint}`,
    method: 'GET'
  });
  const datas = response.data.map((data: any) => convertToNotice(data));
  return datas as Notice[];
};

export const getNoticeById = async (id: number) => {
  const response = await request ({
    url: `${endPoint}/${id}`,
    method: 'GET',
  });
  const data = convertToNotice(response.data);
  return data as Notice;
};

