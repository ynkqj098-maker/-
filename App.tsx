import React, { useState, useEffect, useCallback } from 'react';
import { HealthLog, Mood, Condition } from './types';
import Header from './components/Header';
import LogForm from './components/LogForm';
import History from './components/History';
import { getGeminiAdvice } from './services/geminiService';
import { ThumbsUpIcon, ThumbsDownIcon } from './components/icons';

const App: React.FC = () => {
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
  const [geminiAdvice, setGeminiAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedLogs = localStorage.getItem('healthLogs');
      if (storedLogs) {
        setHealthLogs(JSON.parse(storedLogs));
      }
    } catch (e) {
      console.error("Failed to load health logs from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('healthLogs', JSON.stringify(healthLogs));
    } catch (e) {
      console.error("Failed to save health logs to localStorage", e);
    }
  }, [healthLogs]);

  const addHealthLog = useCallback(async (newLogData: Omit<HealthLog, 'id' | 'date'>) => {
    setIsLoading(true);
    setError('');
    setGeminiAdvice('');
    setFeedbackSubmitted(false);
    
    const newLog: HealthLog = {
      ...newLogData,
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('ja-JP'),
    };

    setHealthLogs(prevLogs => [newLog, ...prevLogs]);

    try {
      const advice = await getGeminiAdvice(newLog);
      setGeminiAdvice(advice);
    } catch (e) {
      console.error(e);
      setError('AIからのアドバイスの取得に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFeedback = (feedback: 'good' | 'bad') => {
    console.log(`Feedback received: ${feedback}`);
    setFeedbackSubmitted(true);
    // In a real application, you would send this feedback to a server.
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto max-w-2xl p-4 md:p-6">
        <div className="space-y-8">
          <LogForm onSubmit={addHealthLog} />
          
          {isLoading && (
            <div className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/50 dark:border-blue-800">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-blue-700 dark:text-blue-300">AIがアドバイスを生成中...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-900/50 dark:border-red-800 dark:text-red-300">
              <p>{error}</p>
            </div>
          )}

          {geminiAdvice && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm animate-fade-in dark:bg-emerald-900/50 dark:border-emerald-800">
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">AIからのアドバイス</h3>
              <p className="text-emerald-700 dark:text-emerald-300">{geminiAdvice}</p>
              
              <div className="mt-4 text-right">
                {!feedbackSubmitted ? (
                  <div className="flex items-center justify-end space-x-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">このアドバイスは役に立ちましたか？</span>
                    <button 
                      onClick={() => handleFeedback('good')} 
                      className="p-1.5 rounded-full hover:bg-green-200 text-green-600 transition-colors dark:hover:bg-green-800/50 dark:text-green-400"
                      aria-label="良い"
                    >
                      <ThumbsUpIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleFeedback('bad')}
                      className="p-1.5 rounded-full hover:bg-red-200 text-red-600 transition-colors dark:hover:bg-red-800/50 dark:text-red-400"
                      aria-label="良くない"
                    >
                      <ThumbsDownIcon className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">フィードバックをありがとうございます！</p>
                )}
              </div>
            </div>
          )}

          <History logs={healthLogs} />
        </div>
      </main>
    </div>
  );
};

export default App;