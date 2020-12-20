import * as express from "express";

export async function middleware(req, res, next) {

    const headers: object = req.headers;
    const apiKey: string = headers['authorization'];

    if (apiKey != '1brendanDaddy!@') {
        res.send(JSON.stringify({
            error: 'Your authrozation is not valid, please get the site API Key.'
        }));
    }

    next();

};