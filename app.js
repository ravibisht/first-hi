import express, { urlencoded } from 'express'
import 'express-async-errors'
import 'dotenv/config'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import passport from 'passport'
import authRouter from './auth/router'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import session from 'express-session'
import connectDB from './core/db'
import { errorHandlerMiddleWare } from './core/middleware'


import { BadRequestException } from './core/exception/index.js'

export const app = express()


app.use(express.static('public'))
app.use(urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store : MongoStore.create({ mongoUrl : process.env.MONGO_DB_URI}),
    unset: 'destroy',
    cookie: {
        maxAge: 24 * 60 * 60 * 60 * 1000,
    },

}))


connectDB(process.env.MONGO_DB_URI).catch((err) => console.log(`Erros is here => ${err}`))

app.use(passport.initialize())

/**
 * Api URLS
 * */
app.use('/', authRouter)

app.get('/', (req, res) => {

    if (!req.session.user || !req.session.user.id) {
        res.redirect('/login')
        return
    }
    res.sendFile('index.html', {
        root: path.join(path.resolve('.'), 'public', 'html'),
    })
})

app.use(errorHandlerMiddleWare)


