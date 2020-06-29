Комментарий к заданию

Задание со звездочкой, где 30000 книг, я не выполнила.
Думаю, что тут можно использовать какую-то библиотеку, чтобы загружать и рендерить новые данные
по мере прокрутки страницы, вроде [react-virtualized c InfiniteLoader](https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md).
Либо как-то асинхронно загружать данные, чтобы получить заданное число книг, отрисовать список,
а остальные книги показать, когда загрузится всё целиком. Но в любом случае нужно будет ограничить высоту списка, чтобы был скролл.

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.
