import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { loadableReady } from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();

const stroe = createStore(rootReducer,
   window.__PRELOADED_STATE__, // 초기값으로 사용
   applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));

async function render(){
  // 프로덕션 환경에서는 loadableReady를 호출하여 필요한 데이터의 로드를 기다린다.
  if(process.env.NODE_ENV === 'production'){
    await loadableReady();
  }
  root.render(
    <Provider store={stroe}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );  
}


render();
