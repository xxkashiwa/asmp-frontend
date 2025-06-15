/* eslint-disable @typescript-eslint/no-unused-vars */
import { Notice } from '@/models/notice';
import useNoticeStore from '@/stores/notice-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import NoticeTable from './components/notice-table/notice-table';
const NoticeManagement: React.FC = () => {
  const { noticeList, fetchNoticeList } = useNoticeStore();
  useEffect(() => {
    fetchNoticeList().catch(error => {
      console.error('Failed to fetch notice data', error);
      toast.error('获取新闻数据失败');
    });
  }, [fetchNoticeList]);
  
  const handleAddNotice = async (data: Notice): Promise<void> => {
    try {
      toast.success('添加新闻成功');
    } catch (error) {
      console.error('Failed to add notice', error);
      toast.error('添加新闻失败');
    }
  };

  const handleEditNotice = async (
    id: string,
    data: Notice
  ): Promise<void> => {
    try {
      toast.success('更新新闻信息成功');
    } catch (error) {
      console.error('Failed to update notice', error);
      toast.error('更新新闻信息失败');
    }
  };
  
  const handleDeleteNotice = async (id: string): Promise<void> => {
    try {
      toast.success('删除新闻成功');
    } catch (error) {
      console.error('Failed to delete notice', error);
      toast.error('删除新闻失败');
    }
  };
    return (
      <div className="w-full overflow-auto">
        <h1 className="mb-6 text-2xl font-bold">校园新闻管理</h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="mb-4 text-gray-600">
            管理校园新闻、活动通知、学术动态等内容
          </p>

          {noticeList.length === 0 ? (
            ''
          ) : (
            <NoticeTable
              data={noticeList}
              onAddNotice={handleAddNotice}
              onEditNotice={handleEditNotice}
              onDeleteNotice={handleDeleteNotice}
            />
          )}
        </div>
      </div>
    );
  };

export default NoticeManagement;