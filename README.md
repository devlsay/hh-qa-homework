# Тестирование API [hh.school.ru]

Тестироание запроса GET с текстовым фильтром по вакансиям /vacancies?text=

## Установка зависимостей и запуск тестов

* Установите [Node.js](https://nodejs.org/en/download/)
`brew install node`
* Установите [yarn](https://yarnpkg.com/lang/en/docs/install/) 
`brew install yarn`
* Перейдите в папку с проектом и установите зависимости
`yarn install`
* Переименуйте файл .env.example в .env и добавьте Токен авторизации
`cp ./.env.example ./.env && nano ./.env`
* Запуск автотестов
`yarn test`

## Отчет по тестированию

| Номер теста | Описание теста | Ожидаемый HTTP статус | Результат |
| :---------: | :------------: | :-------------------: | :-------: |
| 1 | Request without authorization token and filters | 403 Forbidden | отрицательный |
| 2 | Request without authorization token with fliter '/vacancies' | 403 Forbidden | отрицательный |
| 3 | Request with authorization token with text '/vacancies?text=js developer' | 200 | положительный |
| 4 | Request with authorization token with text '/vacancies?text="react developer"' | 200 | положительный |
| 5 | '/vacancies?text=fullstack' | 200 | положительный |
| 6 | '/vacancies?text=!супервайзер' | 200 | положительный |
| 7 | !"java junior" | 200 | положительный |
| 8 | Гео* | 200 | положительный |
| 9 | java OR python | 200 | положительный |
| 10 | "middle react developer" OR "senior angular developer" | 200 | положительный |
| 11 | "reactjs" AND "java developer" | 200 | положительный |
| 12 | frontend NOT angular NOT sass | 200 | положительный |
| 13 | (разработчик OR developer) AND (python OR react)&search_field=name | 200 | положительный |
| 14 | (frontend AND developer) OR (react AND developer) NOT junior NOT middle NOT "fullstack developer"&search_field=name | 200 | отрицательный |
| 15 | NAME:(python OR java) AND COMPANY_NAME:Yandex | 200 | положительный |
| 16 | ghjlfdtw-rjycekmnfyn | 200 | положительный |
| 17 | !ghjlfdtw-rjycekmnfyn | 200 | положительный |
| 18 | "ghjlfdtw-rjycekmnfyn" | 200 | положительный |
| 19 | ыфыфыфыфыфыфыфыфыфыфыфыфыфыфы | 200 | положительный |
| 20 | энженер | 200 | положительный |
    
### Обнаруженные ошибки

| Номер теста  | Описание ошибки |
| :----------: | :-------------: |
| 1  | Результатом запроса без токена авторизации должен быть HTTP status 403 Forbidden |
| 2  | Результатом запроса без токена авторизации должен быть HTTP status 403 Forbidden |
| 14 | Результатом запроса должны быть вакансии, каждая из которых содержит строгое словосочетание 'frontend developer' или 'react developer' и не содержит слова 'angular', 'java' и словосочетание "fullstack developer" |

## Заключение

Итак, что и следовало ожидать, сервис работает отлично.

Результатом запроса без токена является HTTP статус 200, а не 403 Forbidden, как указано в документации (`https://github.com/hhru/api/blob/master/docs/resumes_search.md`).
Неавторизированный пользователь может смотреть вакансии, из этого следует, что ошибка BadRequest появится в том случае, если работодатель, из черого листа пользователя попытается перейти по ссылке, ведущую на резюме этого пользователя. И не важно, откуда у него ссылка* Примерно так я это вижу, вопросов не возникает.

Вопрос возник при тестировании сложных составных логических вопросов, 14 блок теста.
Пришлось повозиться, но толку ноль...