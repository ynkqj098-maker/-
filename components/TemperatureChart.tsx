import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HealthLog } from '../types';

interface TemperatureChartProps {
  data: HealthLog[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  // Recharts expects data in chronological order. Our data is newest-first, so reverse it.
  const chartData = [...data].reverse().map(log => ({
    name: new Date(log.id).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
    体温: log.temperature,
  }));

  if (chartData.length < 2) {
    return (
        <div className="h-48 flex items-center justify-center bg-slate-100 rounded-lg dark:bg-slate-800/50">
            <p className="text-slate-500 dark:text-slate-400">データが2件以上になるとグラフが表示されます。</p>
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5, right: 20, left: -10, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} className="dark:stroke-slate-400" />
          <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#64748b" fontSize={12} unit="°C" className="dark:stroke-slate-400" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
            wrapperClassName="dark:!bg-slate-800 dark:!border-slate-600"
            labelClassName="dark:!text-slate-200"
          />
          <Legend wrapperStyle={{fontSize: "14px"}} />
          <Line type="monotone" dataKey="体温" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} dot={{ fill: '#10b981' }}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;