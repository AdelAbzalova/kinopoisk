# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Данные для авторизации 

Логин: login \
Пароль:password


## Available Scripts

In the project directory, you can run:
### запуск в режиме разработчика:
Запуск проекта в режиме разработчика происходит по команде TOKEN=yourApiToken npm run start ; токен можно получить в боте @kinopoiskdev_bot.\
проект доступен по ссылке http://localhost:7070

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Примеры запросов:

Получение данных о фильмах
```
  curl --request GET \
       --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10' \
       --header 'X-API-KEY: token' \
       --header 'Content-Type: application/json'

```

Получение данных об одном фильме 
```
  curl --request GET \
       --url 'https://api.kinopoisk.dev/v1.4/movie/1143242' \
       --header 'X-API-KEY: token' \
       --header 'Content-Type: application/json'

```

```
ageRating: 18,
alternativeName: "The Gentlemen",
backdrop: {url: 'https://image.openmoviedb.com/kinopoisk-ott-images/1648503/2a000001711b57abb795e9276957168f83e9/orig',
 previewUrl: 'https://image.openmoviedb.com/kinopoisk-ott-images…648503/2a000001711b57abb795e9276957168f83e9/x1000'},
budget: {value: 22000000, currency: '$'},
color: "#DBCCC2",
countries: (2) [{…}, {…}],
deletedAt: null,
description: 
"Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.",
distributors: {distributor: 'Вольга', distributorRelease: null},
enName: null,
externalId: {imdb: 'tt8367814', tmdb: 522627, kpHD: '47649cf90de74aca8da7eb5b17fc8a8a'},
facts: (6) [{…}, {…}, {…}, {…}, {…}, {…}],
fees: {world: null, russia: null, usa: null},
genres: (3) [{…}, {…}, {…}],
id: 1143242,
images: {framesCount: 12},
imagesInfo: {framesCount: 12},
isSeries: false,
lists: (10) ['top500', 'top250', 'popular-films', 'hd-blockbusters', 'hd-revise', 'ozvucheno_kubik_v_kube', 'box-russia-dollar', 'hearing_impairment', 'top20of2023', 'hd'],
logo: {url: 'https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f18064fd95abb74cbcc02873b8/orig'},
movieLength: 113,
name: "Джентльмены",
names: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
networks: null,
persons: (34) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
poster: {url: 'https://image.openmoviedb.com/kinopoisk-images/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/orig', previewUrl: 'https://image.openmoviedb.com/kinopoisk-images/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/x1000'},
premiere: {world: '2019-12-03T00:00:00.000Z', russia: '2020-02-13T00:00:00.000Z', digital: '2020-03-31T00:00:00.000Z'},
productionCompanies: (4) [{…}, {…}, {…}, {…}],
rating: {kp: 8.569, imdb: 7.8, filmCritics: 6.5, russianFilmCritics: 85.7143, await: null},
ratingMpaa: "r",
seasonsInfo: [],
sequelsAndPrequels: [],
seriesLength: null,
shortDescription: "Наркобарон хочет уйти на покой, но криминальный мир не отпускает. Успешное возвращение Гая Ричи к корням",
similarMovies: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
slogan: "Criminal. Class",
spokenLanguages: [{…}],
status: null,
subType: null,
technology: {hasImax: false, has3D: false},
ticketsOnSale: false,
top10: null,
top250: 25,
totalSeriesLength: null,
type: "movie",
typeNumber: 1,
updatedAt: "2024-04-14T01:00:21.965Z",
videos: {trailers: Array(6)},
votes: {kp: 1722847, imdb: 393801, filmCritics: 279, russianFilmCritics: 21, await: 13638},
watchability: {items: Array(4)},
year: 2019,
[[Prototype]]: Object
```
