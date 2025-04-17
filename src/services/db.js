import { openDB } from 'idb';

const DB_NAME = 'TodoDB';
const STORE_NAME = 'todos';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('completed', 'completed');
      }
    },
  });
};

export const getTodos = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};


export const addTodo = async (todo) => {
    const db = await initDB();
    const result = await db.add(STORE_NAME, todo);
  
    // Если уведомления разрешены — показываем уведомление
    if ('Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Новая задача добавлена!', {
          body: todo.text || 'Проверьте ваш список задач!',
          icon: '/logo192.png',
        });
      });
    }
  
    return result;
  };
  

export const updateTodo = async (todo) => {
  const db = await initDB();
  return db.put(STORE_NAME, todo);
};

export const deleteTodo = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};