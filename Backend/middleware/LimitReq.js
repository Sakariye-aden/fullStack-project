import { rateLimit } from 'express-rate-limit'

export const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 m
    limit: 100,
    message: 'to many request please try again .'
})

export const loginLimit = rateLimit({
   windowMs: 3 * 60 * 1000, //15 m
    limit: 5,
    message: 'to many request please try again .'
})