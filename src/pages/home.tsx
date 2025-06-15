import { Card } from '@/components/ui/card';
import { CustomBarChart } from '@/components/ui/charts/custom-charts/custom-bar-chart';
import { CustomPieChart } from '@/components/ui/charts/custom-charts/custom-pie-chart';
import useActivityStore from '@/stores/activity-store';
import useAlumniStore from '@/stores/alumni-store';
import useDonationsStore from '@/stores/donations-store';
import useEnterpriseStore from '@/stores/enterprise-store';
import useNoticeStore from '@/stores/notice-store';
import useOrganizationStore from '@/stores/organization-store';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  // Get data from stores
  const { alumniList } = useAlumniStore();
  const { donationsList } = useDonationsStore();
  const { activities } = useActivityStore();
  const { noticeList } = useNoticeStore();
  const { enterpriseList } = useEnterpriseStore();
  const { organizations } = useOrganizationStore();

  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // Delay to simulate loading and ensure data has loaded from stores
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    alumniList,
    donationsList,
    activities,
    noticeList,
    enterpriseList,
    organizations,
  ]);

  // Prepare data for charts

  // Data for summary bar chart - shows count of each data type
  const summaryData = [
    {
      name: '数据类型',
      校友: alumniList.length,
      活动: activities.length,
      捐赠: donationsList.length,
      通知: noticeList.length,
      企业: enterpriseList.length,
      组织: organizations.length,
    },
  ];

  // Data for alumni gender distribution pie chart
  const genderCounts = alumniList.reduce(
    (acc, alumni) => {
      if (alumni.gender === 'MALE') {
        acc.male += 1;
      } else if (alumni.gender === 'FEMALE') {
        acc.female += 1;
      }
      return acc;
    },
    { male: 0, female: 0 }
  );

  const alumniGenderData = [
    {
      name: '男',
      value: genderCounts.male,
      color: '#3b82f6', // blue
    },
    {
      name: '女',
      value: genderCounts.female,
      color: '#ec4899', // pink
    },
  ];

  // Data for donations status distribution
  const donationsStatusCount = donationsList.reduce(
    (acc, donation) => {
      acc[donation.status] = (acc[donation.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const donationsStatusData = Object.entries(donationsStatusCount).map(
    ([status, count], index) => {
      // Map status to Chinese labels
      const statusLabels: Record<string, string> = {
        PENDING: '待处理',
        CONFIRMED: '已确认',
        CANCELED: '已取消',
        REFUNDED: '已退款',
        COMPLETED: '已完成',
      };

      // Colors for different statuses
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

      return {
        name: statusLabels[status] || status,
        value: count,
        color: colors[index % colors.length],
      };
    }
  );

  // Data for notice type distribution
  const noticeTypeCount = noticeList.reduce(
    (acc, notice) => {
      acc[notice.type] = (acc[notice.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const noticeTypeData = Object.entries(noticeTypeCount).map(
    ([type, count], index) => {
      // Map type to Chinese labels
      const typeLabels: Record<string, string> = {
        news: '新闻',
        announcement: '公告',
        notice: '通知',
      };

      // Colors for different types
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];

      return {
        name: typeLabels[type] || type,
        value: count,
        color: colors[index % colors.length],
      };
    }
  );

  // Data for organization type distribution
  const organizationTypeCount = organizations.reduce(
    (acc, org) => {
      acc[org.type] = (acc[org.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const organizationTypeData = Object.entries(organizationTypeCount).map(
    ([type, count], index) => {
      // Map type to Chinese labels
      const typeLabels: Record<string, string> = {
        REGIONAL: '地区性',
        INDUSTRIAL: '行业性',
        INTEREST: '兴趣性',
      };

      // Colors for different types
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];

      return {
        name: typeLabels[type] || type,
        value: count,
        color: colors[index % colors.length],
      };
    }
  );

  // Data for activity status distribution
  const activityStatusCount = activities.reduce(
    (acc, activity) => {
      acc[activity.status] = (acc[activity.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const activityStatusData = Object.entries(activityStatusCount).map(
    ([status, count], index) => {
      // Map status to Chinese labels
      const statusLabels: Record<string, string> = {
        NOT_STARTED: '未开始',
        STARTED: '进行中',
        FINISHED: '已结束',
      };

      // Colors for different statuses
      const colors = ['#3b82f6', '#10b981', '#ef4444'];

      return {
        name: statusLabels[status] || status,
        value: count,
        color: colors[index % colors.length],
      };
    }
  );
  return (
    <div className="w-full overflow-x-hidden pb-8">
      <h1 className="mb-6 text-2xl font-bold">数据分析</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Summary Cards */}
        <Card className="p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">校友总数</h2>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{alumniList.length}</span>
            <span className="text-sm text-gray-500">校友记录</span>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">活动总数</h2>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{activities.length}</span>
            <span className="text-sm text-gray-500">活动记录</span>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">捐赠项目</h2>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{donationsList.length}</span>
            <span className="text-sm text-gray-500">捐赠项目</span>
          </div>
        </Card>
      </div>{' '}
      {/* Summary Bar Chart - showing all entity counts */}
      <div className="mt-6">
        <Card className="overflow-hidden p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">系统数据概览</h2>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px]">
              <CustomBarChart
                data={summaryData}
                xField="name"
                series={[
                  { key: '校友', name: '校友', color: '#60a5fa' }, // 浅蓝色
                  { key: '活动', name: '活动', color: '#34d399' }, // 浅绿色
                  { key: '捐赠', name: '捐赠', color: '#fbbf24' }, // 浅黄色
                  { key: '通知', name: '通知', color: '#f87171' }, // 浅红色
                  { key: '企业', name: '企业', color: '#a78bfa' }, // 浅紫色
                  { key: '组织', name: '组织', color: '#f472b6' }, // 浅粉色
                ]}
                loading={isLoading}
                height={280}
                className="light-theme"
              />
            </div>
          </div>
        </Card>
      </div>{' '}
      {/* Pie charts for different data distributions */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Alumni gender distribution */}
        <Card className="overflow-hidden p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">校友性别分布</h2>
          {alumniGenderData.length > 0 ? (
            <CustomPieChart
              data={[
                { ...alumniGenderData[0], color: '#60a5fa' }, // 浅蓝色
                { ...alumniGenderData[1], color: '#f472b6' }, // 浅粉色
              ]}
              loading={isLoading}
              formatter={value => `${(value * 100).toFixed(0)}%`}
              className="light-theme"
            />
          ) : (
            <div className="flex h-[250px] items-center justify-center">
              <p className="text-gray-500">暂无数据</p>
            </div>
          )}
        </Card>

        {/* Donations status distribution */}
        <Card className="overflow-hidden p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">捐赠状态分布</h2>
          {donationsStatusData.length > 0 ? (
            <CustomPieChart
              data={donationsStatusData.map((item, index) => ({
                ...item,
                color: [
                  '#60a5fa', // 浅蓝色
                  '#34d399', // 浅绿色
                  '#fbbf24', // 浅黄色
                  '#f87171', // 浅红色
                  '#a78bfa', // 浅紫色
                ][index % 5],
              }))}
              loading={isLoading}
              formatter={value => `${(value * 100).toFixed(0)}%`}
              className="light-theme"
            />
          ) : (
            <div className="flex h-[250px] items-center justify-center">
              <p className="text-gray-500">暂无数据</p>
            </div>
          )}
        </Card>

        {/* Notice type distribution */}
        <Card className="overflow-hidden p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">通知类型分布</h2>
          {noticeTypeData.length > 0 ? (
            <CustomPieChart
              data={noticeTypeData.map((item, index) => ({
                ...item,
                color: [
                  '#60a5fa', // 浅蓝色
                  '#34d399', // 浅绿色
                  '#fbbf24', // 浅黄色
                ][index % 3],
              }))}
              loading={isLoading}
              formatter={value => `${(value * 100).toFixed(0)}%`}
              className="light-theme"
            />
          ) : (
            <div className="flex h-[250px] items-center justify-center">
              <p className="text-gray-500">暂无数据</p>
            </div>
          )}
        </Card>

        {/* Organization type distribution */}
        <Card className="overflow-hidden p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">组织类型分布</h2>
          {organizationTypeData.length > 0 ? (
            <CustomPieChart
              data={organizationTypeData.map((item, index) => ({
                ...item,
                color: [
                  '#60a5fa', // 浅蓝色
                  '#34d399', // 浅绿色
                  '#fbbf24', // 浅黄色
                ][index % 3],
              }))}
              loading={isLoading}
              formatter={value => `${(value * 100).toFixed(0)}%`}
              className="light-theme"
            />
          ) : (
            <div className="flex h-[250px] items-center justify-center">
              <p className="text-gray-500">暂无数据</p>
            </div>
          )}
        </Card>
      </div>{' '}
      {/* Activity Status Distribution */}
      <div className="mt-6">
        <Card className="overflow-hidden p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">活动状态分布</h2>
          {activityStatusData.length > 0 ? (
            <CustomPieChart
              data={activityStatusData.map((item, index) => ({
                ...item,
                color: [
                  '#60a5fa', // 浅蓝色
                  '#34d399', // 浅绿色
                  '#f87171', // 浅红色
                ][index % 3],
              }))}
              loading={isLoading}
              formatter={value => `${(value * 100).toFixed(0)}%`}
              className="light-theme"
            />
          ) : (
            <div className="flex h-[250px] items-center justify-center">
              <p className="text-gray-500">暂无数据</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Home;
