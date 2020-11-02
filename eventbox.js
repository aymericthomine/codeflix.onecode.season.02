function empty() {
    const EventEmitter = require('events');

    const myEmitter = new EventEmitter;

    myEmitter.on('event', () => {
        console.log('hi');
    });
    
    myEmitter.emit('event');
}

module.exports = {
    empty,
}