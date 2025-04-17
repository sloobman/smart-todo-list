import React, { useEffect } from 'react';
import TodoList from './components/TodoList';
import { register } from './registerServiceWorker';
import { scheduleReminderNotifications, checkNotificationSupport } from './services/notification';
import './styles/App.css';

function App() {
  useEffect(() => {
    register();
    
    // Проверяем поддержку и запрашиваем разрешение на уведомления
    const initNotifications = async () => {
      const supported = await checkNotificationSupport();
      if (supported && Notification.permission === 'granted') {
        await scheduleReminderNotifications();
      }
    };
    
    initNotifications();
  }, []);

  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;