const { EventEmitter } = require('events');

function empty() {
    const EventEmitter = require('events');

    const emitter = new EventEmitter();

    emitter.on('hi', () => {
        console.log('CH0ooooooper!');
    })

    emitter.emit('hi');
}

function withArgs(names) {
    const EventEmitter = require('events');

    const myEmitter = new EventEmitter;

    myEmitter.on('newFellow', (name) => {
        console.log(`Here com's a new pirate ->> ${name}`);

    });

    for (let i = 0; i < names.length; i++) {
        myEmitter.emit('newFellow', names[i]);
    }
}

module.exports = {
    empty,
    withArgs,
}