import { NewsTable } from '@/pages/campus-news-management/components/news-table/news-table';
import useNewsStore from '@/stores/news-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const CampusNewsManagement: React.FC = () => {
  const { 
    newsList, 
    loading, 
    fetchNewsList, 
    addNews, 
    updateNews, 
    deleteNews 
  } = useNewsStore();

  useEffect(() => {
    // 组件挂载时从 store 获取数据
    fetchNewsList().catch(error => {
      console.error('Failed to fetch news data', error);
      toast.error('获取新闻数据失败');
    });
  }, [fetchNewsList]);

  const handleAddNews = async (data: Omit<(typeof newsList)[0], 'id'>) => {
    try {
      await addNews(data);
      toast.success('添加新闻成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add news', error);
      toast.error('添加新闻失败');
      return Promise.reject(error);
    }
  };

  const handleEditNews = async (
    id: number,
    data: Omit<(typeof newsList)[0], 'id'>
  ) => {
    try {
      await updateNews(id, data);
      toast.success('更新新闻信息成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update news', error);
      toast.error('更新新闻信息失败');
      return Promise.reject(error);
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await deleteNews(id);
      toast.success('删除新闻成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete news', error);
      toast.error('删除新闻失败');
      return Promise.reject(error);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">校园新闻管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校园新闻、活动通知、学术动态等内容
        </p>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p>加载中...</p>
          </div>
        ) : (
          <NewsTable
            data={newsList}
            onAddNews={handleAddNews}
            onEditNews={handleEditNews}
            onDeleteNews={handleDeleteNews}
          />
        )}
      </div>
    </div>
  );
};

export default CampusNewsManagement;