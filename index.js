//method #1 with just an http server + an http proxy server

const http = require('http');
const httpProxy = require('http-proxy');
//creates the http and the proxy server

const proxy = httpProxy.createProxyServer({
    target: 'http://www.faqs.org/faqs/',
    secure: false
});
// creates the proxy server
//secure: false is to disable ssl certificate validation in case that blocks the reqests 

const server = http.createServer((req, res) => {
    //creates a http server to listen for requests
    console.log(`request URL: ${req.url}`);
    //logs request 
    proxy.web(req, res, (err) => {
        //forwards incoming requesst to target server [uses proxy server]
        if (err) {
            //check if error 
            console.error('Proxy error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Something went wrong.');
        }
    });
});


console.log("proxy server listening on port 8000");
server.listen(8000); //start server 



//method #2 using express 

/*
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({secure: false});

app.use((req,res) => {
    proxy.web(req, res, {target : 'http://www.faqs.org/faqs/'});
});

const PORT = 8000;
app.listen(PORT, () => {console.log(`proxy server listening`) 
});
*/














