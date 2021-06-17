import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import webpack from 'webpack'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import serverRoutes from '../src/routes/serverRoutes'
import getManifest from './getManifest'

import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "../firebase-config";

import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const { ENV, PORT } = process.env

app.use(express.json())
app.use(cookieParser())

if (ENV === 'development') {
    const webpackConfig = require('../webpack.config.dev')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(webpackConfig)
    const serverConfig = { port: PORT, hot: true }
    app.use(webpackDevMiddleware(compiler, serverConfig))
    app.use(webpackHotMiddleware(compiler))
} else {
    app.use((req, res, next) => {
        if (!req.hashManifest) req.hashManifest = getManifest()
        next()
    })
    const dir = path.join(__dirname, '../', '/dist')
    app.use(express.static(dir))
    app.use(helmet())
    app.use(helmet.permittedCrossDomainPolicies())
    app.disable('x-powered-by')
}

const setResponse = (html, manifest) => {
    const mainStyles = manifest ? manifest['main.css'] : 'assets/main.css'
    const mainBuild = manifest ? manifest['main.js'] : 'js/main.js'

    return (
        `
        <!DOCTYPE html>
        <html lang="en" theme="dark">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Log in</title>
                <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
            </head>
            <body>
                <h1>Hola</h1>
                <div id="app">${html}</div>
                <script src="${mainBuild}" type="text/javascript"></script>
            </body>
        </html>
        `
    )
}

const renderApp = async (req, res) => {
    const html = renderToString(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes())}
            </StaticRouter>
        </FirebaseAppProvider>

    )

    res.send(setResponse(html, req.hashManifest))
}


app.get('*', renderApp)

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`${ENV} server running on Port ${PORT}`)
})