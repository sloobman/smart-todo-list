import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { requestNotificationPermission, checkNotificationSupport } from '../services/notification';

const NotificationButton = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      const supported = await checkNotificationSupport();
      setIsSupported(supported);
      if (supported) {
        const permission = Notification.permission;
        setIsEnabled(permission === 'granted');
      }
    };
    checkSupport();
  }, []);

  const handleNotificationClick = async () => {
    if (isSupported) {
      const granted = await requestNotificationPermission();
      setIsEnabled(granted);
    }
  };

  const handleUnsubscribe = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
  
      if (subscription) {
        await subscription.unsubscribe();
        alert('Вы успешно отписались от уведомлений.');
      } else {
        alert('Вы не подписаны на уведомления.');
      }
    }
  };
  

  if (!isSupported) return null;

  return (
    <div className="notification-button">
      <Button
        variant="contained"
        color={isEnabled ? 'success' : 'primary'}
        onClick={handleNotificationClick}
      >
        {isEnabled ? 'Уведомления включены' : 'Включить уведомления'}
      </Button>
      
      <Button
        variant="contained"
        сolor={isEnabled ? 'success' : 'primary'}
        onClick={handleUnsubscribe}
        >
            Отписаться от уведомлений
        </Button>

    </div>
  );
};

export default NotificationButton;