
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import {StaticRouter} from 'react-router-dom/server';

import App from './App';
import path from 'path';
import fs from 'fs';

import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer, { rootSaga } from './modules';
import PreloadContext from './lib/PreloadContext';
import createSagaMiddleware from '@redux-saga/core';
import { END } from 'redux-saga';


const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

function createPage(root, stateScript){
    return `<!DOCTYPE html>
    <html leng="en">
        <head>
            <meta charset="utf-8"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000"/>
            <title>React App</title>
            <link href="${manifest.files['main.css']}" rel="stylesheet"/>
        </head>
        <body>
            <noscript>You need to enable Javascript to run this app.</noscript>
            <div id="root">${root}</div>
            ${stateScript}
            <script src="${manifest.files['main.js']}"></script>
        </body>
    </html>
    `;
}

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = async (req, res, next) => {    
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줍니다.

    const context = {};
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

    const preloadContext = {
        done : false,
        promises : []
    }

    const jsx =(
        <PreloadContext.Provider value={preloadContext}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        </PreloadContext.Provider>
    );
    ReactDOMServer.renderToStaticMarkup(jsx) // renderToStaticMarkup으로 한번 렌더링 실행
    store.dispatch(END); // redux-saga의 END 액션 발생시 액션을 모니터링 하는 사가들이 모두 종료됨

    try{
        await sagaPromise; // 기존에 진행 중이던 사가들이 모두 끝날때까지 기다린다.
        await Promise.all(preloadContext.promises); // 모든 프로미스를 기다립니다.
    }catch(e){
        return res.status(500);
    }

    preloadContext.done = true;
    const root = ReactDOMServer.renderToString(jsx); // 렌더링 실행
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`; // 리덕스 초기 상태를 스크립트로 주입
    res.send(createPage(root, stateScript));  // 결과물 응답
}

const serve = express.static(path.resolve('./build'), {
    index: false // "/" 경로에서 index.html을 보여주지 않도록 설정
})

app.use(serve); // serverRender 이전에 위치해야 함
app.use(serverRender);

app.listen(5000, () => {
    console.log('Runnig on http://localhost:5000');
});