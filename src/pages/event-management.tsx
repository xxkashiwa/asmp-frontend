import React from 'react';

const EventManagement: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold">活动管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友活动、聚会、讲座、研讨会等内容
        </p>

        {/* 这里可以添加活动管理的具体内容 */}
        <div className="rounded-md border p-4">
          <p>活动列表将在此显示</p>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
