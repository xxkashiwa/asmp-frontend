import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from '@/components/ui/charts/custom-chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BarData {
  [key: string]: string | number; // 动态键值对，支持多个数据系列
}

interface BarChartProps {
  data: BarData[];
  className?: string;
  loading?: boolean;
  xField: string; // X轴字段名
  series: {
    key: string; // 数据字段名
    name: string; // 显示名称
    color: string; // 柱子颜色
  }[];
  height?: number | string; // 图表高度
  barGap?: number; // 柱子之间的间距
  barSize?: number; // 柱子宽度
  formatter?: (value: number, name: string) => string; // 数值格式化函数
  showGrid?: boolean; // 是否显示网格线
  showLegend?: boolean; // 是否显示图例
}

export const CustomBarChart = ({
  data,
  className,
  loading,
  xField,
  series,
  height = 300,
  barGap = 4,
  barSize,
  formatter,
  showGrid = true,
  showLegend = true,
}: BarChartProps) => {
  return (
    <ChartContainer className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} barGap={barGap} barSize={barSize}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
          )}{' '}
          <XAxis
            dataKey={xField}
            className="text-xs text-white"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            className="text-xs text-white"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ChartTooltip formatter={formatter} />} />
          {showLegend && (
            <ChartLegend
              items={series.map(item => {
                return {
                  name: item.name,
                  color: item.color,
                };
              })}
            />
          )}
          {series.map(item => (
            <Bar
              key={item.key}
              dataKey={item.key}
              name={item.name}
              fill={item.color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
