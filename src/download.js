'use strict';

const alfy = require('alfy');
const http = require('http');
const url  = require('url');
const fs   = require('fs');

alfy.input = JSON.parse(alfy.input)

let options = {
    host: url.parse(alfy.input.link).host,
    path: url.parse(alfy.input.link).path,
};

http.get(options, function(response) {

    let data = '';

    response.setEncoding('binary')

    response.on('data', function(chunk) {
        data += chunk;
    })

    response.on('end', function() {
        fs.writeFileSync(alfy.input.path, data, function(err) {
            if (err) console.error(err);
        })
    })

    response.on('error', function(e) {
        console.error(e.message);
    })
});
