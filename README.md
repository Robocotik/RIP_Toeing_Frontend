# RIP_Toeing_Frontend

Данный репозиторий является совокупностью лабораторных работ по РИП студента Старкин А.А. ИУ5-52Б.

## Toeing - PWA приложение "Румбы ветров"

Веб-приложение для расчета полетов по румбам ветров с поддержкой PWA (Progressive Web App).

### 🚀 Демо

Приложение развернуто на GitHub Pages: [https://robocotik.github.io/RIP_Toeing_Frontend/](https://robocotik.github.io/RIP_Toeing_Frontend/)

### ✨ Особенности

- 📱 PWA поддержка - можно установить как нативное приложение
- 🎨 Адаптивный дизайн
- 🔄 Офлайн поддержка
- 🧭 Интерактивные румбы ветров
- 📊 Расчет времени полета
- 🛒 Корзина заявок

### 🛠 Технологии

- React 18 + TypeScript
- Vite + vite-plugin-pwa
- React Bootstrap
- React Router
- Service Workers для кэширования

### 📦 Установка и запуск

```bash
# Клонируем репозиторий
git clone https://github.com/Robocotik/RIP_Toeing_Frontend.git
cd RIP_Toeing_Frontend

# Устанавливаем зависимости
npm install

# Запускаем в режиме разработки
npm run dev

# Собираем для продакшена
npm run build

# Превью собранного проекта
npm run preview
```

### 🌐 GitHub Pages деплой

Проект автоматически деплоится на GitHub Pages при пуше в ветку `ReactPWA` через GitHub Actions.

### 📱 PWA функции

После открытия сайта в браузере:

1. Браузер предложит установить приложение
2. Приложение будет работать офлайн
3. Изображения и данные кэшируются автоматически
4. Поддерживается на мобильных устройствах
