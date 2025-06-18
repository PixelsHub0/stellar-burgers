# Stellar Burger

Космическая бургерная на React + TypeScript, где любой обитатель Вселенной может собрать и заказать свой идеальный бургер.

## 🚀 Функционал
- **Конструктор бургера** (перетаскивание ингредиентов, выбор булки, динамический подсчёт цены)
- **Список ингредиентов** с детальным модальным описанием
- **Лента заказов** в реальном времени (WebSocket)
- **Авторизация и регистрация** пользователя
- **Профиль пользователя**: просмотр и редактирование данных, история заказов
- **Protected Routes**: закрытые маршруты для личного кабинета и истории

## 📁 Структура проекта
``` 
stellar-burgers/
│
├─ .env.example # Пример переменных окружения
├─ package.json # Скрипты и зависимости
├─ webpack.config.js # Настройка сборки
├─ tsconfig.json # Конфигурация TypeScript
├─ .eslintrc.js # Правила ESLint
│
├─ public/ # Статические файлы
│ ├─ index.html
│ └─ ...
│
└─ src/
├─ index.tsx # Точка входа, подключение Redux и Router
├─ index.css # Глобальные стили
│
├─ components/ # Переиспользуемые UI-компоненты
│ ├─ App/ # Корневой компонент, маршруты, модалки
│ ├─ AppHeader/ # Навигационная шапка
│ ├─ burger-ingredients/
│ ├─ burger-constructor/
│ ├─ order-info/
│ └─ ui/ # Кнопки, лоадеры и т.д.
│
├─ pages/ # Страницы приложения (Constructor, Feed, Profile, Auth и т.д.)
│
├─ services/ # Redux Toolkit: store, slices, thunks, селекторы
│ ├─ store.ts
│ └─ slices/
│
├─ utils/ # API-клиент, работа с куками, типы данных
│ ├─ burger-api.ts
│ ├─ cookie.ts
│ └─ types.ts
│
└─ styles/ # Типизация CSS-модулей (*.module.css)
```

## ⚙️ Установка и запуск

**1. Клонировать репозиторий:**
   ```bash
   git clone https://github.com/<ваш-логин>/stellar-burgers.git
   cd stellar-burgers
   ```

**2. Скопировать и заполнить переменные окружения:**

```bash
cp .env.example .env
# в .env указать API_URL и другие ключи
```

**3. Установить зависимости:**

```bash
npm install
```

**4.Запустить в режиме разработки:**

```bash
npm start
```

**5.Сборка production-версии:**

```bash
npm run build
```
**6.Запустить Storybook (UI-компоненты):**

```bash
npm run storybook
```
