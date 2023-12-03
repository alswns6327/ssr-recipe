import React from "react";
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import {StaticRouter} from 'react-router-dom/server';
import App from './App';
import path from 'path';

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
    console.log("::", req.url);
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줍니다.
    const context = {};
    const jsx =(
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx); // 렌더링 실행
    res.send(root);
}

const serve = express.static(path.resolve('./build'), {
    index: false // "/" 경로에서 index.html을 보여주지 않도록 설정
})

app.use(serve); // serverRender 이전에 위치해야 함
app.use(serverRender);

app.listen(5000, () => {
    console.log('Runnig on http://localhost:5000');
});