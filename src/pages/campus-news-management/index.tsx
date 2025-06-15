import useNoticeStore from '@/stores/notice-store';
import { useEffect } from 'react';
import { toast } from 'sonner';

const NoticeManagement: React.FC = () => {
  const { noticeList, fetchNoticeList } = useNoticeStore();
  useEffect(()=>{
    fetchNoticeList().catch(error => {
      console.error('Failed to fetch notice data', error);
      toast.error('获取新闻数据失败');
    });
  },[fetchNoticeList]);
  console.log('Notice List: ',noticeList);
    return (
      <div className="w-full overflow-auto">
        <h1 className="mb-6 text-2xl font-bold">校园新闻管理</h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="mb-4 text-gray-600">
            管理校园新闻、活动通知、学术动态等内容
          </p>

          {/* {loading ? (
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
          )} */}
        </div>
      </div>
    );
  };

export default NoticeManagement;