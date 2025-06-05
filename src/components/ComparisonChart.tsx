
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

interface ComparisonChartProps {
  trends: Array<{
    id: string;
    title: string;
    popularity: number;
    change: number;
  }>;
}

export const ComparisonChart = ({ trends }: ComparisonChartProps) => {
  const data = trends.map(trend => ({
    name: trend.title.length > 15 ? trend.title.substring(0, 15) + '...' : trend.title,
    popularity: trend.popularity,
    change: trend.change
  }));

  const colors = ['#d97706', '#059669', '#dc2626', '#7c3aed'];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="popularity" fill="#d97706" name="Popularity %" />
          <Bar dataKey="change" fill="#059669" name="Change %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
