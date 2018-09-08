import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';

class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <Head>
          <title>User Management SPA</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="" />
          <link rel="shortcut icon" href="/static/images/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

        <style jsx global>{`
          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: #4290f7;
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #4290f7, 0 0 5px #4290f7;
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
          }
        `}</style>
      </html>
    );
  }
}

export default MyDocument;
