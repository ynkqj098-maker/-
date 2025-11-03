import React, { useState } from 'react';
import { HealthLog, Mood, Condition } from '../types';
import { MoodHappyIcon, MoodOkayIcon, MoodSadIcon } from './icons';

interface LogFormProps {
  onSubmit: (log: Omit<HealthLog, 'id' | 'date'>) => void;
}

const LogForm: React.FC<LogFormProps> = ({ onSubmit }) => {
  const [temperature, setTemperature] = useState<number>(36.5);
  const [condition, setCondition] = useState<Condition>(Condition.Normal);
  const [mood, setMood] = useState<Mood>(Mood.Okay);
  const [symptoms, setSymptoms] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (temperature < 34 || temperature > 42) {
      setError('体温は34.0℃から42.0℃の間で入力してください。');
      return;
    }
    setError('');
    onSubmit({ temperature, condition, mood, symptoms });
    setSymptoms(''); // Clear symptoms after submit
  };

  interface MoodButtonProps {
    value: Mood;
    current: Mood;
    onClick: (mood: Mood) => void;
    children: React.ReactNode;
  }

  const MoodButton: React.FC<MoodButtonProps> = ({ value, current, onClick, children }) => (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`flex-1 p-3 flex flex-col items-center justify-center space-y-1 rounded-lg transition-all duration-200 border-2 ${current === value ? 'bg-emerald-100 border-emerald-400 scale-105 shadow-md dark:bg-emerald-900/50 dark:border-emerald-500' : 'bg-white border-slate-300 hover:bg-slate-100 dark:bg-slate-700 dark:border-slate-500 dark:hover:bg-slate-600'}`}
    >
      {children}
      <span className={`text-sm font-medium ${current === value ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}`}>{value}</span>
    </button>
  );

  interface ConditionButtonProps {
    value: Condition;
    current: Condition;
    onClick: (condition: Condition) => void;
  }

  const ConditionButton: React.FC<ConditionButtonProps> = ({ value, current, onClick }) => (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${current === value ? 'bg-emerald-500 text-white shadow dark:bg-emerald-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500'}`}
    >
      {value}
    </button>
  );

  return (
    <section className="bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
      <h2 className="text-xl font-bold mb-4 dark:text-slate-100">今日の記録</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">体温 (°C)</label>
          <input
            id="temperature"
            type="number"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white"
            required
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">体調</label>
          <div className="flex space-x-2">
            {(Object.values(Condition)).map(c => <ConditionButton key={c} value={c} current={condition} onClick={setCondition} />)}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">気分</label>
          <div className="flex space-x-3">
            <MoodButton value={Mood.Happy} current={mood} onClick={setMood}><MoodHappyIcon className="w-8 h-8" /></MoodButton>
            <MoodButton value={Mood.Okay} current={mood} onClick={setMood}><MoodOkayIcon className="w-8 h-8" /></MoodButton>
            <MoodButton value={Mood.Sad} current={mood} onClick={setMood}><MoodSadIcon className="w-8 h-8" /></MoodButton>
          </div>
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">症状など (任意)</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={3}
            placeholder="例: 少し喉が痛い"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        >
          記録する
        </button>
      </form>
    </section>
  );
};

export default LogForm;