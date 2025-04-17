export function register(config) {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker.register(swUrl)
          .then(registration => {
            console.log('Service Worker зарегистрирован:', registration);
  
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('Доступно новое обновление. Пожалуйста, обновите страницу.');
  
                    if (config && config.onUpdate) {
                      config.onUpdate(registration);
                    }
                  } else {
                    console.log('Контент кэширован для оффлайн использования.');
                  }
                }
              };
            };
          })
          .catch(error => {
            console.error('Ошибка регистрации Service Worker:', error);
          });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }