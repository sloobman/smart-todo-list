const publicVapidKey = 'BL0D5_kunmHXIsN21KhSY1cf4jlXuUS1jmjTjNsVnc3tC0xKDqBi-cIocxHG7u6t82TAiefGCiz_6yxXNO8e8Ig'; // Замените на реальный ключ

export const checkNotificationSupport = () => {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
};

export const requestNotificationPermission = async () => {
  if (!checkNotificationSupport()) return false;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const showNotification = (title, options) => {
  if (!checkNotificationSupport()) return;

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  }
};

export const subscribeToPushNotifications = async () => {
  if (!checkNotificationSupport()) return null;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) return subscription;

  const newSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  return newSubscription;
};

export const unsubscribeFromPushNotifications = async () => {
  if (!checkNotificationSupport()) return;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Напоминание о невыполненных задачах каждые 2 часа
export const scheduleReminderNotifications = async () => {
    


  if (!checkNotificationSupport()) return;

  const registration = await navigator.serviceWorker.ready;


    if (!('periodicSync' in registration)) {
    console.warn('Periodic Sync API не поддерживается этим браузером.');
    return;
    }

    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state !== 'granted') {
    console.warn('Нет разрешения на Periodic Background Sync.');

    setInterval(() => {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('У вас есть невыполненные задачи!');
          });
        }
      }, 2 * 60 * 60 * 1000);


    return;
    }

  
  // Очищаем предыдущие интервалы
  const alarms = await registration.periodicSync.getTags();
  if (alarms.includes('uncompleted-tasks-reminder')) {
    await registration.periodicSync.unregister('uncompleted-tasks-reminder');
  }

  // Регистрируем новый интервал
  try {
    await registration.periodicSync.register('uncompleted-tasks-reminder', {
      minInterval: 2 * 60 * 60 * 1000, // 2 часа в миллисекундах 2 * 60 * 60
    });
    console.log('Periodic sync registered');
  } catch (error) {
    console.error('Periodic sync could not be registered:', error);
  }
};