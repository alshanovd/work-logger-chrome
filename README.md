# Chrome Extention для списывания времени по задачам

## Установка

1. Клонируем/качаем проект себе.
2. Переходим в [Расширения](chrome://extensions/)
3. Включаем режим разработчика (справа сверху).
4. Нажимаем Загрузить распакованное расширение (слева сверху).
5. Заходим в папку build из проекта, Выбрать.

## Использование

1. Корпоративный VPN должен быть включен.
2. Открываем плагин и пишем номер своей доски. Чтобы узнать номер своей доски нужно открыть спринт, в урле будет параметр `?rapidView=234`. 234 - это номер доски.
3. Выбираем задачу из списка.
4. Кнопками вводим количество времени которое хотим списать, смотрим что дата верная.
5. Жмем Списать.

**Задачи можно закреплять наверху списка.**
**В Настройках можно сменить сортировку задач.**
**Номер задачи во всплывающем окне кликабельный.**

## Разработка/Дебаг

1. Клонируем проект.
1. Устанавливаем его в Chrome, видим что у него есть ID.
2. `npm i`
3. `npm run watch`
5. В хроме открываем [chrome-extension://gmiflecodjojohdmjhhppnjjmcpaieco/index.html](chrome-extension://gmiflecodjojohdmjhhppnjjmcpaieco/index.html), где gmiflecodjojohdmjhhppnjjmcpaieco это ID дополнения из п. 2.