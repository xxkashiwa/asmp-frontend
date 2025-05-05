import React from 'react';

const DonationManagement: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold">捐赠管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友捐赠记录、项目资金、感谢报告等内容
        </p>

        {/* 这里可以添加捐赠管理的具体内容 */}
        <div className="rounded-md border p-4">
          <p>捐赠记录将在此显示</p>
        </div>
      </div>
    </div>
  );
};

export default DonationManagement;
