import React from 'react';
import { HealthLog } from '../types';
import TemperatureChart from './TemperatureChart';
import { MoodHappyIcon, MoodOkayIcon, MoodSadIcon } from './icons';

interface HistoryProps {
  logs: HealthLog[];
}

const History: React.FC<HistoryProps> = ({ logs }) => {

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case '絶好調': return <MoodHappyIcon className="w-6 h-6" />;
      case 'ふつう': return <MoodOkayIcon className="w-6 h-6" />;
      case '不調': return <MoodSadIcon className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
      <h2 className="text-xl font-bold mb-4 dark:text-slate-100">過去の記録</h2>
      {logs.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-8">まだ記録がありません。</p>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">体温の推移</h3>
            <TemperatureChart data={logs} />
          </div>
          <div className="space-y-3">
             {logs.map(log => (
              <div key={log.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 dark:bg-slate-700/50 dark:border-slate-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{log.date}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">体温: <span className="font-bold">{log.temperature.toFixed(1)}°C</span></p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">体調: {log.condition}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    {getMoodIcon(log.mood)}
                    <span className="text-sm">{log.mood}</span>
                  </div>
                </div>
                {log.symptoms && (
                  <p className="mt-2 pt-2 border-t border-slate-200 text-sm text-slate-700 bg-white p-2 rounded dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">症状: {log.symptoms}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default History;