import { cn } from '@/lib/utils';
interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const ChartContainer = ({
  children,
  className,
  loading,
}: ChartContainerProps) => {
  // 检查是否应用浅色主题
  const isLightTheme = className?.includes('light-theme');

  return (
    <div
      className={cn(
        'border-border relative h-full min-h-[250px] w-full rounded-lg border p-4',
        isLightTheme ? 'bg-white' : 'bg-[#0A1526]',
        className
      )}
    >
      {loading && (
        <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
        </div>
      )}
      {children}
    </div>
  );
};
interface ChartLegendProps {
  items: {
    name: string;
    color: string;
  }[];
}

export const ChartLegend = ({ items }: ChartLegendProps) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {items.map(item => (
        <div key={item.name} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-white">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => string;
  labelFormatter?: (label: string | undefined) => string;
}

export const ChartTooltip = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}: ChartTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium text-gray-700">
        {labelFormatter ? labelFormatter(label) : label}
      </p>
      {payload.map(entry => (
        <div key={entry.name} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-700">{entry.name}:</span>
          <span className="text-sm font-medium text-gray-900">
            {formatter ? formatter(entry.value, entry.name) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
