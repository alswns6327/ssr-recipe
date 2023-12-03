import React from "react";
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(
    <div>React Server rendering</div>
);

console.log(html);