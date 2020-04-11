const EventEmmiter = require('events');
const fs = require('fs');
const path = require('path');

const emmiter = new EventEmmiter();

emmiter.on('log', (message) => {
    // Pegue o arquivo log.txt do diretório __dirname
    fs.appendFile(path.join(__dirname, 'log.txt'), message, (err) => {
        if (err) throw err;
    })
});

function log (message) {
    emmiter.emit('log', message);
}

module.exports = log;
